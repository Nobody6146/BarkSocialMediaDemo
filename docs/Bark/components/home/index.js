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
        const routeRequest = eventDetails.request;
        const state = routeRequest.state;
        this.model = {
            posts: state.posts
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
