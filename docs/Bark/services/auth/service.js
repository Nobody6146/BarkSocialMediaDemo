import { HydrateAppService } from "../../lib/hydrate/hydrate.js";
import { LoginRoute } from "../../routes/login/route.js";
import { ApiService } from "../api/service.js";
import { StorageService } from "../storage/service.js";
export class AuthService extends HydrateAppService {
    //Dependencies
    #hydrate;
    #storage;
    #api;
    #userCredentials;
    constructor(hydrate) {
        super();
        this.#hydrate = hydrate;
        this.#storage = hydrate.dependency(StorageService, this).instance;
        this.#api = hydrate.dependency(ApiService, this).instance;
        this.#userCredentials = this.#storage.loggedInUser;
    }
    get isAuthenticated() {
        //Lets ignore validating tokens and stuff in this basic example
        return this.#userCredentials !== null;
    }
    get user() {
        return this.#userCredentials;
    }
    async signIn(emailAddress, password) {
        const response = await this.#api.signIn(emailAddress, password);
        if (!response.success)
            throw new Error(response.error);
        this.#userCredentials = response.result;
        this.#storage.loggedInUser = this.#userCredentials;
        return this.#userCredentials;
    }
    async signOut() {
        this.#storage.signOut();
        this.#userCredentials = null;
        this.#hydrate.route(LoginRoute.path);
    }
    async signUp(emailAddress, password) {
        const response = await this.#api.signUp(emailAddress, password);
        if (!response.success)
            throw new Error(response.error);
    }
}
export let AuthServiceFactory = function (hydrate, source) {
    return new AuthService(hydrate);
};
