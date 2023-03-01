import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs, HydrateModelChange, HydrateModelSubscription, HydrateRouteEventDetails } from "../../lib/hydrate/hydrate.js";
import { SearchRoute, SearchRouteState } from "../../routes/search/route.js";
import { ButtonComponentState } from "../generic/button/component.js";
import { InputComponentState } from "../generic/input/component.js";
import { PostComponentState } from "../post/component.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<SearchComponentState, SearchComponent> {
    this:SearchComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:SearchComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let SearchComponentTemplate = `<template h-model="app.page.search" h-init h-route="#search" h-routing="resolve">
    <div class="center" style="width: 100%; padding: 10px; justify-content: space-around;">
        <input h-component="app-input" placeholder="Search..." style="width: 200px"
            h-model="^.${propName(x => x.searchInput)}">
        <button h-model="^.${propName(x => x.searchButton)}" h-component="app-button" style="width: 70px;">Search</button>
    </div>
    <div>
        <span>
            <div class="center">
                <span h-model="^" h-property="textContent: ${propName(x => x.posts.length)} + ' Posts'"></span>
            </div>
        </span>
        <app-post h-model="^.${propName(x => x.posts)}"></app-post>
    </div>
</template>`;

export interface SearchComponentState {
    searchInput:InputComponentState<string>;
    searchButton:ButtonComponentState;
    posts:PostComponentState;
}

export class SearchComponent extends HydrateComponent<SearchComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        const component = this;
        const routeRequest = (eventDetails as HydrateRouteEventDetails).request;
        const state = routeRequest.state as SearchRouteState;
        this.model = {
            searchInput: {
                valid: true,
                value: state.query
            },
            searchButton: {
                click: function() {
                    component.hydrate.route(`?query=${component.state.searchInput.value}${SearchRoute.path}`);
                }.bind(this)
            },
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
                }
            })
        }
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}