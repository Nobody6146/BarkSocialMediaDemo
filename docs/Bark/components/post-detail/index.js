import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
export class PostDetailComponent extends HydrateComponent {
    onInit(eventDetails) {
        if (eventDetails.type === "routing.resolve") {
            const routeRequest = eventDetails.request;
            const state = routeRequest.state;
            this.model = {
                posts: [
                    {
                        post: state.post,
                        showComments: true
                    }
                ]
            };
        }
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
