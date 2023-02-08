import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { SignInRoute } from "../../routes/sign-in/route.js";
import { SignUpRoute } from "../../routes/sign-up/route.js";

export interface LoginComponentState {
    signInUrl:string;
    signUpUrl:string;
}

export class LoginComponent extends HydrateComponent<LoginComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        this.model = {
            signInUrl: SignInRoute.path,
            signUpUrl: SignUpRoute.path
        }
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}