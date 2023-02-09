import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { AuthService } from "../../services/auth/service.js";
export class HeaderComponent extends HydrateComponent {
    #auth;
    onInit(eventDetails) {
        this.#auth = this.dependency(AuthService);
        this.model = {
            signOutButton: {
                click: function () {
                    this.signOut();
                }.bind(this)
            },
        };
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
    get authenticated() {
        return this.#auth.isAuthenticated;
    }
}
