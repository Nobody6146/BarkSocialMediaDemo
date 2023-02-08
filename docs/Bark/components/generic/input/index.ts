import { HydrateComponent, HydrateEventDetails } from "../../../lib/hydrate/hydrate.js";

export interface InputComponentState<T> {
    value?:T;
    valid?:boolean;
}

export class InputComponent extends HydrateComponent<InputComponentState<any>> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}