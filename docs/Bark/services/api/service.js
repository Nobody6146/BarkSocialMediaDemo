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
    async users() {
        return this.#storage.logins.map(x => this.#mapLoginToUser(x));
    }
    async #posts(id) {
        const posts = this.#storage.posts.filter(x => id == null || x.id === id);
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
            };
        });
    }
    async posts(id) {
        const result = await this.#posts(id);
        if (result.length === 0)
            return {
                statusCode: "400",
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
    async likePost(userId, postId) {
        const post = this.#storage.posts.find(x => x.id === postId);
        const login = this.#storage.logins.find(x => x.id === userId);
        if (post == null)
            return {
                statusCode: "400",
                success: false,
                error: "Post not found",
            };
        if (login == null)
            return {
                statusCode: "400",
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
                statusCode: "400",
                success: false,
                error: "Post not found",
            };
        if (login == null)
            return {
                statusCode: "400",
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
}
export let ApiServiceFactory = function (hydrate, source) {
    return new ApiService(hydrate);
};
