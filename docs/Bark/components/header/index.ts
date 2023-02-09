import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { AuthService } from "../../services/auth/service.js";
import { ButtonComponentState } from "../generic/button/index.js";

export interface HeaderComponentState {
    signOutButton:ButtonComponentState;
}

export class HeaderComponent extends HydrateComponent<HeaderComponentState> {

    #auth:AuthService;

    onInit(eventDetails:HydrateEventDetails):void {
        this.#auth = this.dependency(AuthService);
        this.model = {
            signOutButton: {
                click: function() {
                    this.signOut();
                }.bind(this)
            },
        }
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

    get authenticated() {
        return this.#auth.isAuthenticated;
    }
}