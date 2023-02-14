import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";
import { CommentDto, PostDto, UserDto } from "../../models/dtos.js";
import { BarkLogin, BarkPost } from "../../models/models.js";
import { StorageService } from "../storage/service.js";
import { UuidService } from "../uuid/service.js";

export type ApiStatusCode = "200" | "201" | "204" | "400" | "401" | "404" | "409" | "500";

export interface ApiResponse<T> {
    statusCode:ApiStatusCode;
    success:boolean;
    result?:T;
    error?:string;
}

export interface ApiUser {
    id:string;
    username:string;
    emailAddress:string;
    password:string;
}

export class ApiService extends HydrateAppService
{
    #uuid:UuidService;
    #storage:StorageService;

    constructor(hydrate:HydrateApp) {
        super();
        this.#uuid = hydrate.dependency(UuidService, this).instance;
        this.#storage = hydrate.dependency(StorageService, this).instance;
    }

    #mapLoginToUser(login:BarkLogin):UserDto {
        const profile = this.#storage.profiles.find(x => x.loginId === login.id);
        return {
            userId: login?.id,
            emailAddress: login.emailAddress,
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            image: profile?.image,
            username: login.username
        };
    }

    async signIn(emailAddress:string, password:string):Promise<ApiResponse<UserDto>> {
        const login = this.#storage.logins.find(x => x.emailAddress === emailAddress && x.password === password);
        if(login)
            return {
                statusCode: "200",
                success: true,
                error: null,
                result: this.#mapLoginToUser(login)
            };
        return {
            statusCode: "401",
            success: false,
            error: "invalid login credentials",
            result: null
        };
    }

    async signUp(emailAddress:string, password:string):Promise<ApiResponse<null>> {
        const logins = this.#storage.logins;
        let login = logins.find(x => x.emailAddress === emailAddress && x.password === password);
        emailAddress.substring(0, emailAddress.indexOf("@"))
        if(login)
            return {
                statusCode: "409",
                success: false,
                error: "email is already in use",
                result: null
            };
        login = {
            id: emailAddress.replace(/\W+/g, ""),
            username: `@${emailAddress.substring(0, emailAddress.indexOf("@"))}`,
            emailAddress: emailAddress,
            password: password
        }
        logins.push(login);
        this.#storage.logins = logins;
        return {
            statusCode: "201",
            success: true,
            error: null,
            result: null
        };
    }

    #users():UserDto[] {
        return this.#storage.logins.map(x => this.#mapLoginToUser(x));
    }
    async users():Promise<ApiResponse<UserDto[]>> {
        const result = await this.#users();
        if(result.length === 0)
            return {
                statusCode: "404",
                success: false,
                error: "No users found",
                result: null
            }

        return {
            statusCode: "200",
            success: true,
            error: null,
            result: result
        }
    }

    #posts(id?:string):PostDto[] {
        const posts:BarkPost[] = this.#storage.posts.filter(x => id == null || x.id === id);
        const users = this.#users();
        const postLikes = this.#storage.postLikes;
        const comments = this.#storage.comments;
        const commentLikes = this.#storage.commentLikes;

        const results = posts.map(post => {
            const user = users.find(x => x.userId === post.loginId);
            return {
                postId: post.id,
                date: post.date,
                user: user,
                text: post.text,
                likes: postLikes.filter(x => x.postId === post.id).map(like => {
                    return {
                        likeId: like.id,
                        user: users.find(x => x.userId === like.loginId)
                    };
                }),
                comments: null
            }
        });
        results.forEach(post => {
            post.comments = comments.filter(x => x.postId === post.postId).map(comment => {
                return {
                    commentId: comment.id,
                    user: users.find(x => x.userId === comment.loginId),
                    date: comment.date,
                    likes: commentLikes.filter(x => x.commentId === comment.id).map(like => {
                        return {
                            likeId: like.id,
                            user: users.find(x => x.userId === comment.loginId)
                        }
                    }),
                    text: comment.text,
                    post: this
                }
            })
        })
        return results;
    }

    async posts(id?:string):Promise<ApiResponse<PostDto[]>> {
        const result = await this.#posts(id);

        if(result.length === 0)
            return {
                statusCode: "404",
                success: false,
                error: "No posts found",
                result: null
            }

        return {
            statusCode: "200",
            success: true,
            error: null,
            result: result
        }
    }

    async likePost(userId:string, postId:string):Promise<ApiResponse<PostDto>> {
        const post = this.#storage.posts.find(x => x.id === postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if(post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        if(login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const postLikes = this.#storage.postLikes;
        let postLike = postLikes.find(x => x.loginId === userId && x.postId === postId);
        if(postLike == null)
        {
            postLike = {
                id: this.#uuid.generateUUID(),
                loginId: userId,
                postId: postId
            };
            //Save like
            postLikes.push(postLike);
            this.#storage.postLikes = postLikes;
        }
        const response = await this.posts(postId);
        return {
            statusCode: "201",
            success: true,
            error: null,
            result: response.result[0]
        };
    }

    async unlikePost(userId:string, postId:string):Promise<ApiResponse<PostDto>> {
        const post = this.#storage.posts.find(x => x.id === postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if(post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        if(login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const postLikes = this.#storage.postLikes;
        let postLike = postLikes.findIndex(x => x.loginId === userId && x.postId === postId);
        if(postLike > -1)
        {
            //Delete like
            postLikes.splice(postLike, 1);
            this.#storage.postLikes = postLikes;
        }
        const response = await this.posts(postId);
        return {
            statusCode: "204",
            success: true,
            error: null,
            result: response.result[0]
        };
    }

    async likeComment(userId:string, commentId:string):Promise<ApiResponse<CommentDto>> {
        const comment = this.#storage.comments.find(x => x.id === commentId);
        if(comment == null)
            return {
                statusCode: "404",
                success: false,
                error: "Comment not found",
            };
        const post = this.#storage.posts.find(x => x.id === comment.postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if(post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        if(login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const commentLikes = this.#storage.commentLikes;
        let commentLike = commentLikes.find(x => x.loginId === userId && x.commentId === commentId);
        if(commentLike == null)
        {
            commentLike = {
                id: this.#uuid.generateUUID(),
                loginId: userId,
                commentId: commentId
            };
            //Save like
            commentLikes.push(commentLike);
            this.#storage.commentLikes = commentLikes;
        }
        const response = await this.posts(post.id);
        return {
            statusCode: "201",
            success: true,
            error: null,
            result: response.result[0].comments.find(x => x.commentId === commentId)
        };
    }

    async unlikeComment(userId:string, commentId:string):Promise<ApiResponse<CommentDto>> {
        const comment = this.#storage.comments.find(x => x.id === commentId);
        if(comment == null)
            return {
                statusCode: "404",
                success: false,
                error: "Comment not found",
            };
        const post = this.#storage.posts.find(x => x.id === comment.postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if(post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        if(login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const commentLikes = this.#storage.commentLikes;
        let commentLike = commentLikes.findIndex(x => x.loginId === userId && x.commentId === commentId);
        if(commentLike > -1)
        {
            //Delete like
            commentLikes.splice(commentLike, 1);
            this.#storage.commentLikes = commentLikes;
        }
        const response = await this.posts(post.id);
        return {
            statusCode: "204",
            success: true,
            error: null,
            result: response.result[0].comments.find(x => x.commentId === commentId)
        };
    }
}

export let ApiServiceFactory:HydrateAppServiceFactory<ApiService> = function(hydrate:HydrateApp, source:any) {
    return new ApiService(hydrate);
}