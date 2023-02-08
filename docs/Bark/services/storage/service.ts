import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";
import { LoginDto, UserDto } from "../models/models.js";

const AUTH_STORAGE = "auth";
const USERS_STORAGE = "users";
const LOGINS_STORAGE = "logins";

export class StorageService extends HydrateAppService
{
    constructor() {
        super();
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

    get users():UserDto[] {
        const data = localStorage.getItem(USERS_STORAGE)
        if(!data)
            return [];
        return JSON.parse(data);
    }
    set users(value:UserDto[]) {
        localStorage.setItem(USERS_STORAGE, JSON.stringify(value));
    }

    get logins():LoginDto[] {
        const data = localStorage.getItem(LOGINS_STORAGE)
        if(!data)
            return [];
        return JSON.parse(data);
    }
    set logins(value:LoginDto[]) {
        localStorage.setItem(LOGINS_STORAGE, JSON.stringify(value));
    }
}

export let StorageServiceFactory:HydrateAppServiceFactory<StorageService> = function(hydrate:HydrateApp, source:any) {
    return new StorageService();
}