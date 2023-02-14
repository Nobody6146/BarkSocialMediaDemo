import { HydrateComponent, HydrateEventDetails, HydrateModelChange, HydrateModelSubscription, HydrateRouteEventDetails } from "../../lib/hydrate/hydrate.js";
import { SearchRoute, SearchRouteState } from "../../routes/search/route.js";
import { ButtonComponentState } from "../generic/button/index.js";
import { InputComponentState } from "../generic/input/index.js";
import { PostComponentState } from "../post/index.js";

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
            posts: state.posts
        }
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}