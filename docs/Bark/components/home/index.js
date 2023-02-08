import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { AuthService } from "../../services/auth/service.js";
const APP_NAME = "Demo App";
export class HomeComponent extends HydrateComponent {
    #auth;
    onInit(eventDetails) {
        const component = this;
        this.model = {
            signOutButton: {
                click: function () {
                    component.signOut();
                }
            }
        };
        this.#auth = this.dependency(AuthService);
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
    signOut() {
        this.#auth.signOut();
    }
}
