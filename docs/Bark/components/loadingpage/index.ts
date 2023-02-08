import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { PageState } from "../page/index.js";

interface LoadingpageComponentState extends PageState {

}

export class LoadingpageComponent extends HydrateComponent<LoadingpageComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}