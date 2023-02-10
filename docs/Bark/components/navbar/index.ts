import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../../routes/home/route.js";
import { SearchRoute } from "../../routes/search/route.js";

export interface NavItemState {
    url:string,
    icon:string
}

// export interface NavbarComponentState {
//     items:NavItemState[]
// };

export type NavbarComponentState = NavItemState[];

export class NavbarComponent extends HydrateComponent<NavbarComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        this.model = [
            {icon: "home", url: HomeRoute.path},
            {icon: "search", url:SearchRoute.path},
            {icon: "notifications", url: "#n"},
            {icon: "mail", url: "#m"}
        ]
    }

    onPreRender(eventDetails:HydrateEventDetails):void {
    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}