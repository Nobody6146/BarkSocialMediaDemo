import { HydrateAppService } from "../../lib/hydrate/hydrate.js";
const AUTH_STORAGE = "auth";
const USERS_STORAGE = "users";
const LOGINS_STORAGE = "logins";
export class StorageService extends HydrateAppService {
    constructor() {
        super();
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
    get users() {
        const data = localStorage.getItem(USERS_STORAGE);
        if (!data)
            return [];
        return JSON.parse(data);
    }
    set users(value) {
        localStorage.setItem(USERS_STORAGE, JSON.stringify(value));
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
}
export let StorageServiceFactory = function (hydrate, source) {
    return new StorageService();
};
