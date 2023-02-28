import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs, HydrateRouteEventDetails } from "../../lib/hydrate/hydrate.js";
import { HomeRouteState } from "../../routes/home/route.js";
import { NewPostRoute } from "../../routes/new-post/route.js";
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
        <app-post h-model="^.${propName(x => x.posts)}"></app-post>
        <a class="new-button" h-model="^" h-attribute="href: ${propName(x => x.newPostUrl)}" h-component="app-button">
            <span class="new-button material-symbols-outlined">post_add</span>
        </a>
    </div>
    <style>
        :root .new-button {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            z-index: 10;
            position: fixed;
            bottom: calc(var(--nav-height) + 10px);
            right: 10px;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            font-size: 2rem;
        }
    </style>
</template>`;

interface HomeComponentState {
    posts:PostComponentState
    newPostUrl:string;
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
                    showComments: false,
                    postInput: {
                        valid: true,
                        value: ""
                    },
                    submitButton: { 
                        valid: false
                    }
                };
            }),
            newPostUrl: NewPostRoute.path
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