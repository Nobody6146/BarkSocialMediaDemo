import { HydrateAppService } from "../../lib/hydrate/hydrate.js";
import { StorageService } from "../storage/service.js";
import { UuidService } from "../uuid/service.js";
export class ApiService extends HydrateAppService {
    #uuid;
    #storage;
    constructor(hydrate) {
        super();
        this.#uuid = hydrate.dependency(UuidService, this).instance;
        this.#storage = hydrate.dependency(StorageService, this).instance;
    }
    #mapLoginToUser(login) {
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
    async signIn(emailAddress, password) {
        const login = this.#storage.logins.find(x => x.emailAddress === emailAddress && x.password === password);
        if (login)
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
    async signUp(emailAddress, password) {
        const logins = this.#storage.logins;
        let login = logins.find(x => x.emailAddress === emailAddress && x.password === password);
        emailAddress.substring(0, emailAddress.indexOf("@"));
        if (login)
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
        };
        logins.push(login);
        this.#storage.logins = logins;
        return {
            statusCode: "201",
            success: true,
            error: null,
            result: null
        };
    }
    #users() {
        return this.#storage.logins.map(x => this.#mapLoginToUser(x));
    }
    async users() {
        const result = await this.#users();
        if (result.length === 0)
            return {
                statusCode: "404",
                success: false,
                error: "No users found",
                result: null
            };
        return {
            statusCode: "200",
            success: true,
            error: null,
            result: result
        };
    }
    #posts(id) {
        const posts = this.#storage.posts.filter(x => id == null || x.id === id);
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
            };
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
                            user: users.find(x => x.userId === like.loginId)
                        };
                    }),
                    text: comment.text,
                    post: this
                };
            });
        });
        return results;
    }
    async posts(id) {
        const result = await this.#posts(id);
        if (result.length === 0)
            return {
                statusCode: "404",
                success: false,
                error: "No posts found",
                result: null
            };
        return {
            statusCode: "200",
            success: true,
            error: null,
            result: result
        };
    }
    async writePost(userId, text) {
        const login = this.#storage.logins.find(x => x.id === userId);
        if (login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const post = {
            id: this.#uuid.generateUUID(),
            loginId: userId,
            text: text,
            date: new Date().toISOString()
        };
        const posts = this.#storage.posts;
        posts.push(post);
        this.#storage.posts = posts;
        const response = await this.posts(post.id);
        return {
            statusCode: "201",
            success: true,
            error: null,
            result: response.result[0]
        };
    }
    async likePost(userId, postId) {
        const post = this.#storage.posts.find(x => x.id === postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if (post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        if (login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const postLikes = this.#storage.postLikes;
        let postLike = postLikes.find(x => x.loginId === userId && x.postId === postId);
        if (postLike == null) {
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
    async unlikePost(userId, postId) {
        const post = this.#storage.posts.find(x => x.id === postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if (post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        if (login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const postLikes = this.#storage.postLikes;
        let postLike = postLikes.findIndex(x => x.loginId === userId && x.postId === postId);
        if (postLike > -1) {
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
    async likeComment(userId, commentId) {
        const comment = this.#storage.comments.find(x => x.id === commentId);
        if (comment == null)
            return {
                statusCode: "404",
                success: false,
                error: "Comment not found",
            };
        const post = this.#storage.posts.find(x => x.id === comment.postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if (post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        if (login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const commentLikes = this.#storage.commentLikes;
        let commentLike = commentLikes.find(x => x.loginId === userId && x.commentId === commentId);
        if (commentLike == null) {
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
    async unlikeComment(userId, commentId) {
        const comment = this.#storage.comments.find(x => x.id === commentId);
        if (comment == null)
            return {
                statusCode: "404",
                success: false,
                error: "Comment not found",
            };
        const post = this.#storage.posts.find(x => x.id === comment.postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if (post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        if (login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const commentLikes = this.#storage.commentLikes;
        let commentLike = commentLikes.findIndex(x => x.loginId === userId && x.commentId === commentId);
        if (commentLike > -1) {
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
    async writeComment(userId, postId, text) {
        const login = this.#storage.logins.find(x => x.id === userId);
        if (login == null)
            return {
                statusCode: "404",
                success: false,
                error: "User not found",
            };
        const posts = this.#storage.posts;
        const post = posts.find(x => x.id === postId);
        if (post == null)
            return {
                statusCode: "404",
                success: false,
                error: "Post not found",
            };
        const comment = {
            id: this.#uuid.generateUUID(),
            loginId: userId,
            postId: postId,
            text: text,
            date: new Date().toISOString()
        };
        const comments = this.#storage.comments;
        comments.push(comment);
        this.#storage.comments = comments;
        const response = await this.posts(post.id);
        return {
            statusCode: "201",
            success: true,
            error: null,
            result: response.result[0]
        };
    }
}
export let ApiServiceFactory = function (hydrate, source) {
    return new ApiService(hydrate);
};
