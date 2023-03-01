import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { SearchRoute } from "../../routes/search/route.js";
function argName(exp) {
    return name(exp);
}
function propName(exp) {
    return name(exp);
}
function name(exp) {
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
                    showComments: false,
                    postInput: {
                        valid: true,
                        value: ""
                    },
                    submitButton: {
                        valid: false
                    }
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
