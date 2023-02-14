import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";
import { UserDto } from "../../models/dtos.js";
import { BarkComment, BarkCommentLike, BarkLogin, BarkPost, BarkPostLike, BarkProfile } from "../../models/models.js";
import { DataSeederService } from "../data-seeder/service.js";

const AUTH_STORAGE = "auth";
const PROFILES_STORAGE = "profiles";
const LOGINS_STORAGE = "logins";
const POSTS_STORAGE = "posts";
const POST_LIKES_STORAGE = "postLikes";
const COMMENTS_STORAGE = "comments";
const COMMENT_LIKES_STORAGE = "commentLikes";

export class StorageService extends HydrateAppService
{
    
    constructor(hydrate:HydrateApp) {
        super();
        this.#seedData(hydrate);
    }

    #seedData(hydrate:HydrateApp) {
        const seedData = hydrate.dependency(DataSeederService, this).instance.seedData();
        if(this.logins.length === 0)
        {
            this.logins = seedData.logins;
            this.profiles = seedData.profiles;
            this.posts = seedData.posts;
            this.postLikes = seedData.postLikes;
            this.comments = seedData.comments;
            this.commentLikes = seedData.commentLikes;
        }
    }

    get loggedInUser():UserDto {
        const data = localStorage.getItem(AUTH_STORAGE)
        if(!data)
            return null;
        return JSON.parse(data);
    }
    set loggedInUser(value:UserDto) {
        localStorage.setItem(AUTH_STORAGE, JSON.stringify(value));
    }
    signOut():void {
        localStorage.removeItem(AUTH_STORAGE);
    }

    get profiles():BarkProfile[] {
        const data = localStorage.getItem(PROFILES_STORAGE)
        if(!data)
            return [];
        return JSON.parse(data);
    }
    set profiles(value:BarkProfile[]) {
        localStorage.setItem(PROFILES_STORAGE, JSON.stringify(value));
    }

    get logins():BarkLogin[] {
        const data = localStorage.getItem(LOGINS_STORAGE)
        if(!data)
            return [];
        return JSON.parse(data);
    }
    set logins(value:BarkLogin[]) {
        localStorage.setItem(LOGINS_STORAGE, JSON.stringify(value));
    }

    get posts():BarkPost[] {
        const data = localStorage.getItem(POSTS_STORAGE);
        if(!data)
            return [];
        return JSON.parse(data);
    }
    set posts(posts:BarkPost[]) {
        localStorage.setItem(POSTS_STORAGE, JSON.stringify(posts));
    }

    get postLikes():BarkPostLike[] {
        const data = localStorage.getItem(POST_LIKES_STORAGE);
        if(!data)
            return [];
        return JSON.parse(data);
    }
    set postLikes(likes:BarkPostLike[]) {
        localStorage.setItem(POST_LIKES_STORAGE, JSON.stringify(likes));
    }

    get comments():BarkComment[] {
        const data = localStorage.getItem(COMMENTS_STORAGE);
        if(!data)
            return [];
        return JSON.parse(data);
    }
    set comments(comments:BarkComment[]) {
        localStorage.setItem(COMMENTS_STORAGE, JSON.stringify(comments));
    }

    get commentLikes():BarkCommentLike[] {
        const data = localStorage.getItem(COMMENT_LIKES_STORAGE);
        if(!data)
            return [];
        return JSON.parse(data);
    }
    set commentLikes(likes:BarkCommentLike[]) {
        localStorage.setItem(COMMENT_LIKES_STORAGE, JSON.stringify(likes));
    }
}

export let StorageServiceFactory:HydrateAppServiceFactory<StorageService> = function(hydrate:HydrateApp, source:any) {
    return new StorageService(hydrate);
}