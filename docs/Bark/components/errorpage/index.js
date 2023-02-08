import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { LoggerService } from "../../services/logger/service.js";
export class ErrorpageComponent extends HydrateComponent {
    onInit(eventDetails) {
    }
    onPreRender(eventDetails) {
        this.dependency(LoggerService).error("Could not resolve route");
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
