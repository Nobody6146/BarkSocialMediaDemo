import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { SearchRoute, SearchRouteModelPath } from "../../routes/search/route.js";
export class SearchComponent extends HydrateComponent {
    #searchSubscription;
    onInit(eventDetails) {
        const component = this;
        this.model = {
            searchInput: {
                valid: true,
                value: ""
            },
            searchButton: {
                click: function () {
                    component.hydrate.route(`?query=${component.state.searchInput.value}${SearchRoute.path}`);
                }.bind(this)
            },
            posts: []
        };
        this.#searchSubscription = this.hydrate.subscribe(SearchRouteModelPath, (change) => {
            this.model.searchInput.value = change.state.query;
            this.model.posts = change.state.posts;
        });
        this.#searchSubscription.trigger();
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
        this.#searchSubscription.unsubscribe();
    }
}
