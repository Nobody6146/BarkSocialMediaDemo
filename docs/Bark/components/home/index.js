import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
function argName(exp) {
    return name(exp);
}
function propName(exp) {
    return name(exp);
}
function name(exp) {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}
export let HomeComponentTemplate = `<template h-model="app.page.home" h-init h-routing="resolve">
    <div>
        <app-post h-model="^.${propName(x => x.posts)}">
    </div>
</template>`;
const APP_NAME = "Demo App";
export class HomeComponent extends HydrateComponent {
    #auth;
    #api;
    async onInit(eventDetails) {
        this.#auth = this.dependency(AuthService);
        this.#api = this.dependency(ApiService);
        const routeRequest = eventDetails.request;
        const state = routeRequest.state;
        this.model = {
            posts: state.posts.map(x => {
                return {
                    post: x,
                    showComments: false
                };
            })
        };
        this.#auth = this.dependency(AuthService);
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
