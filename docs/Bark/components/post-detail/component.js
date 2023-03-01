import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
import { LoggerService } from "../../services/logger/service.js";
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
export let PostDetailComponentTemplate = `<template h-model="app.page.postDetail" h-init h-routing="resolve">
    <div>
        <app-post h-model="^.${propName(x => x.posts)}">
    </div>
</template>`;
export class PostDetailComponent extends HydrateComponent {
    #api;
    #auth;
    #logger;
    #commentSubscription;
    onInit(eventDetails) {
        this.#api = this.dependency(ApiService);
        this.#auth = this.dependency(AuthService);
        this.#logger = this.dependency(LoggerService);
        if (eventDetails.type === "routing.resolve") {
            const component = this;
            const routeRequest = eventDetails.request;
            const state = routeRequest.state;
            this.model = {
                posts: [
                    {
                        post: state.post,
                        showComments: true,
                        postInput: {
                            valid: true,
                            value: ""
                        },
                        submitButton: {
                            valid: false,
                            click: function () {
                                component.saveComment(component.#auth.user.userId, component.state.posts[0].post.postId, component.state.posts[0].postInput.value);
                            }
                        }
                    }
                ]
            };
        }
        this.#commentSubscription = this.hydrate.subscribe(this.hydrate.path(this.model.posts[0].postInput) + ".value", ((change) => {
            this.validateCommentForm(change.state);
        }).bind(this));
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
        this.#disposeSubscriptions();
    }
    #disposeSubscriptions() {
        this.#commentSubscription.unsubscribe();
    }
    validateCommentForm(text) {
        this.model.posts[0].submitButton.valid = text.trim().length > 0;
    }
    async saveComment(userId, postId, text) {
        const repsonse = await this.#api.writeComment(userId, postId, text);
        if (!repsonse.success) {
            this.#logger.error(repsonse.error);
            return;
        }
        this.model.posts[0].postInput.value = "";
        this.model.posts[0].post.comments = repsonse.result.comments;
    }
}
