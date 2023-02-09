import { HydrateAppService } from "../../lib/hydrate/hydrate.js";
import { DataSeederService } from "../data-seeder/service.js";
const AUTH_STORAGE = "auth";
const PROFILES_STORAGE = "profiles";
const LOGINS_STORAGE = "logins";
const POSTS_STORAGE = "posts";
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
}
export let StorageServiceFactory = function (hydrate, source) {
    return new StorageService(hydrate);
};
