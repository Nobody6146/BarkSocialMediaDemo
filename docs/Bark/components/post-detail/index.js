import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
export class PostDetailComponent extends HydrateComponent {
    onInit(eventDetails) {
        if (eventDetails.type === "routing.resolve") {
            const routeRequest = eventDetails.request;
            const state = routeRequest.state;
            this.model.posts = [state.post];
        }
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}