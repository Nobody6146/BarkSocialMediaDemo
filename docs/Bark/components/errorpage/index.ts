import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { LoggerService } from "../../services/logger/service.js"

interface ErrorpageComponentState {
    
}

export class ErrorpageComponent extends HydrateComponent<ErrorpageComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {
        this.dependency(LoggerService).error("Could not resolve route");
    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}