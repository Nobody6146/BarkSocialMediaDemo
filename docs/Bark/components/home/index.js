import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
const APP_NAME = "Demo App";
export class HomeComponent extends HydrateComponent {
    #auth;
    #api;
    async onInit(eventDetails) {
        this.#auth = this.dependency(AuthService);
        this.#api = this.dependency(ApiService);
        this.model = {
            posts: await this.#api.posts() //this.posts().concat(this.posts()).concat(this.posts()).concat(this.posts()).concat(this.posts()).concat(this.posts()).concat(this.posts()).concat(this.posts())//await this.#api.posts()
        };
        this.#auth = this.dependency(AuthService);
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
