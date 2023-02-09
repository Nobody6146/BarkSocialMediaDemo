import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";
import { UserDto } from "../../models/dtos.js";
import { BarkLogin, BarkPost, BarkProfile } from "../../models/models.js";
import { DataSeederService } from "../data-seeder/service.js";

const AUTH_STORAGE = "auth";
const PROFILES_STORAGE = "profiles";
const LOGINS_STORAGE = "logins";
const POSTS_STORAGE = "posts";

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
}

export let StorageServiceFactory:HydrateAppServiceFactory<StorageService> = function(hydrate:HydrateApp, source:any) {
    return new StorageService(hydrate);
}