import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../../routes/home/route.js";
import { SearchRoute } from "../../routes/search/route.js";
export class NavbarComponent extends HydrateComponent {
    onInit(eventDetails) {
        this.model = [
            { icon: "home", url: HomeRoute.path },
            { icon: "search", url: SearchRoute.path },
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
