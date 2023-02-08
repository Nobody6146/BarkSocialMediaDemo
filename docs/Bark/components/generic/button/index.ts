import { HydrateComponent, HydrateEventDetails } from "../../../lib/hydrate/hydrate.js";

export interface ButtonComponentState {
    click?:() => void;
    valid?:boolean;
}

export class ButtonComponent extends HydrateComponent<ButtonComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }

    click() {
        const action = this.state?.click;
        if(!action)
            return;
        action();
    }
}