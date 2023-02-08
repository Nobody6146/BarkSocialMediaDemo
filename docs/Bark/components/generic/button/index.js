import { HydrateComponent } from "../../../lib/hydrate/hydrate.js";
export class ButtonComponent extends HydrateComponent {
    onInit(eventDetails) {
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
    click() {
        const action = this.state?.click;
        if (!action)
            return;
        action();
    }
}
