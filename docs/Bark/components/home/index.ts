import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs, HydrateRouteEventDetails } from "../../lib/hydrate/hydrate.js";
import { HomeRouteState } from "../../routes/home/route.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
import { PostComponentState } from "../post/index.js";



//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<HomeComponentState, HomeComponent> {
    this:HomeComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:HomeComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}


export let HomeComponentTemplate = `<template h-model="app.page.home" h-init h-routing="resolve">
    <div>
        <app-post h-model="^.${propName(x => x.posts)}">
    </div>
</template>`;

interface HomeComponentState {
    posts:PostComponentState
}

const APP_NAME = "Demo App";

export class HomeComponent extends HydrateComponent<HomeComponentState> {

    #auth:AuthService;
    #api:ApiService;

    async onInit(eventDetails:HydrateEventDetails):Promise<void> {
        this.#auth = this.dependency(AuthService);
        this.#api = this.dependency(ApiService);
        const routeRequest = (eventDetails as HydrateRouteEventDetails).request;
        const state = routeRequest.state as HomeRouteState;
        this.model = {
            posts: state.posts.map(x => {
                return {
                    post: x,
                    showComments: false
                };
            })
        }
        this.#auth = this.dependency(AuthService);
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}