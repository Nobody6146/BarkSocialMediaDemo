import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";
import { PostDto, UserDto } from "../../models/dtos.js";
import { BarkLogin, BarkPost } from "../../models/models.js";
import { StorageService } from "../storage/service.js";
import { UuidService } from "../uuid/service.js";

export type ApiStatusCode = "200" | "201" | "400" | "401" | "409" | "500";

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

    async users():Promise<UserDto[]> {
        return this.#storage.logins.map(x => this.#mapLoginToUser(x));
    }

    async posts(id?:string):Promise<PostDto[]> {
        const posts:BarkPost[] = this.#storage.posts.filter(x => id == null || x.id === id);
        const users = await this.users();
        const likes = this.#storage.postLikes;

        return posts.map(post => {
            const user = users.find(x => x.userId === post.loginId);
            return {
                postId: post.id,
                date: post.date,
                user: user,
                text: post.text,
                likes: likes.filter(x => x.postId === post.id).map(like => {
                    return {
                        likeId: like.id,
                        user: users.find(x => x.userId === like.loginId)
                    };
                })
            }
        });
    }

    async likePost(userId:string, postId:string):Promise<ApiResponse<PostDto>> {
        const post = this.#storage.posts.find(x => x.id === postId);
        const user = this.#storage.logins.find(x => x.id === userId);
        if(post == null)
            return {
                statusCode: "400",
                success: false,
                error: "Post not found",
            };
        if(post == null)
            return {
                statusCode: "400",
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
        }
        const result:PostDto = this.posts(postLike.id)[0];
        return {
            statusCode: "201",
            success: true,
            error: null,
            result: result
        };
    }
}

export let ApiServiceFactory:HydrateAppServiceFactory<ApiService> = function(hydrate:HydrateApp, source:any) {
    return new ApiService(hydrate);
}