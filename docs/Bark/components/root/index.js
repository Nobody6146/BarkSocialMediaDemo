import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { AppRoutes } from "../../routes.js";
const APP_NAME = "Demo";
export class RootComponent extends HydrateComponent {
    onInit(eventDetails) {
        const routes = AppRoutes.filter(x => x.path.match(/\w+/)).map(x => {
            return {
                title: x.name ?? `${x.path.substring(1, 2).toUpperCase()}${x.path.substring(2)}`,
                route: x.path,
                component: `app-${x.path.substring(1)}`
            };
        });
        this.model = {
            text: "Hello world",
            pages: routes.map(x => {
                return {
                    title: `${APP_NAME} - ${x.title}`,
                    route: x.route,
                    component: x.component
                };
            }),
            // navbar: [
            // ]
        };
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
