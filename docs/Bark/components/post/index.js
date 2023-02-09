import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
export class PostComponent extends HydrateComponent {
    onInit(eventDetails) {
        console.log("Post");
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
