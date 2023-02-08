import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { SignInRoute } from "../../routes/sign-in/route.js";
import { SignUpRoute } from "../../routes/sign-up/route.js";
export class LoginComponent extends HydrateComponent {
    onInit(eventDetails) {
        this.model = {
            signInUrl: SignInRoute.path,
            signUpUrl: SignUpRoute.path
        };
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
