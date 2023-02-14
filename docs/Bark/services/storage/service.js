import { HydrateAppService } from "../../lib/hydrate/hydrate.js";
import { DataSeederService } from "../data-seeder/service.js";
const AUTH_STORAGE = "auth";
const PROFILES_STORAGE = "profiles";
const LOGINS_STORAGE = "logins";
const POSTS_STORAGE = "posts";
const POST_LIKES_STORAGE = "postLikes";
const COMMENTS_STORAGE = "comments";
const COMMENT_LIKES_STORAGE = "commentLikes";
export class StorageService extends HydrateAppService {
    constructor(hydrate) {
        super();
        this.#seedData(hydrate);
    }
    #seedData(hydrate) {
        const seedData = hydrate.dependency(DataSeederService, this).instance.seedData();
        if (this.logins.length === 0) {
            this.logins = seedData.logins;
            this.profiles = seedData.profiles;
            this.posts = seedData.posts;
            this.postLikes = seedData.postLikes;
            this.comments = seedData.comments;
            this.commentLikes = seedData.commentLikes;
        }
    }
    get loggedInUser() {
        const data = localStorage.getItem(AUTH_STORAGE);
        if (!data)
            return null;
        return JSON.parse(data);
    }
    set loggedInUser(value) {
        localStorage.setItem(AUTH_STORAGE, JSON.stringify(value));
    }
    signOut() {
        localStorage.removeItem(AUTH_STORAGE);
    }
    get profiles() {
        const data = localStorage.getItem(PROFILES_STORAGE);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    set profiles(value) {
        localStorage.setItem(PROFILES_STORAGE, JSON.stringify(value));
    }
    get logins() {
        const data = localStorage.getItem(LOGINS_STORAGE);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    set logins(value) {
        localStorage.setItem(LOGINS_STORAGE, JSON.stringify(value));
    }
    get posts() {
        const data = localStorage.getItem(POSTS_STORAGE);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    set posts(posts) {
        localStorage.setItem(POSTS_STORAGE, JSON.stringify(posts));
    }
    get postLikes() {
        const data = localStorage.getItem(POST_LIKES_STORAGE);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    set postLikes(likes) {
        localStorage.setItem(POST_LIKES_STORAGE, JSON.stringify(likes));
    }
    get comments() {
        const data = localStorage.getItem(COMMENTS_STORAGE);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    set comments(comments) {
        localStorage.setItem(COMMENTS_STORAGE, JSON.stringify(comments));
    }
    get commentLikes() {
        const data = localStorage.getItem(COMMENT_LIKES_STORAGE);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    set commentLikes(likes) {
        localStorage.setItem(COMMENT_LIKES_STORAGE, JSON.stringify(likes));
    }
}
export let StorageServiceFactory = function (hydrate, source) {
    return new StorageService(hydrate);
};
