import { HydrateComponent, HydrateEventDetails, HydrateRouteEventDetails } from "../../lib/hydrate/hydrate.js";
import { HomeRouteState } from "../../routes/home/route.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
import { ButtonComponentState } from "../generic/button/index.js";
import { PostComponentState } from "../post/index.js";
// import { APP_NAME } from "../../components/root/index.js"

interface HomeComponentState {
    posts:PostComponentState
}

const APP_NAME = "Demo App";

export class HomeComponent extends HydrateComponent<HomeComponentState> {

    #auth:AuthService;
    #api:ApiService;

    async onInit(eventDetails:HydrateEventDetails):Promise<void> {
        this.#auth = this.dependency(AuthService);
        this.#api = this.dependency(ApiService);
        const routeRequest = (eventDetails as HydrateRouteEventDetails).request;
        const state = routeRequest.state as HomeRouteState;
        this.model = {
            posts: state.posts.map(x => {
                return {
                    post: x,
                    showComments: false
                };
            })
        }
        this.#auth = this.dependency(AuthService);
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}