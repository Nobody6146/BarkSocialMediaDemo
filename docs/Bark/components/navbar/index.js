import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../../routes/home/route.js";
export class NavbarComponent extends HydrateComponent {
    onInit(eventDetails) {
        this.model = [
            { icon: "home", url: HomeRoute.path },
            { icon: "search", url: "#search" },
            { icon: "notifications", url: "#n" },
            { icon: "mail", url: "#m" }
        ];
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
