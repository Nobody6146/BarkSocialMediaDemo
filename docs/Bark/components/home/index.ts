import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { AuthService } from "../../services/auth/service.js";
import { ButtonComponentState } from "../generic/button/index.js";
// import { APP_NAME } from "../../components/root/index.js"

interface HomeComponentState {
    signOutButton:ButtonComponentState;
}

const APP_NAME = "Demo App";

export class HomeComponent extends HydrateComponent<HomeComponentState> {

    #auth:AuthService;

    onInit(eventDetails:HydrateEventDetails):void {
        const component = this;
        this.model = {
            signOutButton: {
                click: function() {
                    component.signOut();
                }
            }
        }
        this.#auth = this.dependency(AuthService);
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }

    signOut() {
        this.#auth.signOut();
    }
}