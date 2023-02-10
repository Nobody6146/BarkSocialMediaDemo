import { HydrateComponent, HydrateEventDetails, HydrateModelChange, HydrateModelSubscription } from "../../lib/hydrate/hydrate.js";
import { SearchRoute, SearchRouteModelPath, SearchRouteState } from "../../routes/search/route.js";
import { ButtonComponentState } from "../generic/button/index.js";
import { InputComponentState } from "../generic/input/index.js";
import { PostComponentState } from "../post/index.js";

export interface SearchComponentState {
    searchInput:InputComponentState<string>;
    searchButton:ButtonComponentState;
    posts:PostComponentState;
}

export class SearchComponent extends HydrateComponent<SearchComponentState> {

    #searchSubscription:HydrateModelSubscription<SearchRouteState>;

    onInit(eventDetails:HydrateEventDetails):void {
        const component = this;
        this.model = {
            searchInput: {
                valid: true,
                value: ""
            },
            searchButton: {
                click: function() {
                    component.hydrate.route(`?query=${component.state.searchInput.value}${SearchRoute.path}`);
                }.bind(this)
            },
            posts: []
        }
        this.#searchSubscription = this.hydrate.subscribe(SearchRouteModelPath, (change:HydrateModelChange<SearchRouteState>) => {
            this.model.searchInput.value = change.state.query;
            this.model.posts = change.state.posts
        });
        this.#searchSubscription.trigger();
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {
        this.#searchSubscription.unsubscribe();
    }
}