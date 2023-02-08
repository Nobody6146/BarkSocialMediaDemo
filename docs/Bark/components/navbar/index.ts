import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";

export interface NavItemState {
    title:string,
    url:string
}

export interface NavbarComponentState {
    items:NavItemState[]
};

export class NavbarComponent extends HydrateComponent<NavbarComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}