import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { SearchRoute } from "../../routes/search/route.js";
export class SearchComponent extends HydrateComponent {
    onInit(eventDetails) {
        const component = this;
        const routeRequest = eventDetails.request;
        const state = routeRequest.state;
        this.model = {
            searchInput: {
                valid: true,
                value: state.query
            },
            searchButton: {
                click: function () {
                    component.hydrate.route(`?query=${component.state.searchInput.value}${SearchRoute.path}`);
                }.bind(this)
            },
            posts: state.posts.map(x => {
                return {
                    post: x,
                    showComments: false
                };
            })
        };
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
