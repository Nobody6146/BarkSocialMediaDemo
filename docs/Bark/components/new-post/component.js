import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../../routes/home/route.js";
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
export let NewPostComponentTemplate = `<template h-model="app.pages.newpost" h-init>
    <div>
        <br />
        <div>
            <textarea h-component="app-input" placeholder="Please type your post..." class="post-text"
                h-model="^.${propName(x => x.postInput)}">
            </textarea>
        </div>
        <br />
        <br />
        <div class="center">
            <button h-model="^.${propName(x => x.submitButton)}" h-component="app-button">Post</button>
        </div>
    </div>
    <style h-style>
        :root .post-text {
            width: 80%;
            margin: 0px 10%;
            height: 200px;
        }
    </style>
</template>`;
export class NewPostComponent extends HydrateComponent {
    #inputSubscription;
    #api;
    #auth;
    #logger;
    onInit(eventDetails) {
        this.#api = this.dependency(ApiService);
        this.#auth = this.dependency(AuthService);
        this.#logger = this.dependency(LoggerService);
        const component = this;
        this.model = {
            postInput: {
                valid: true,
                value: ""
            },
            submitButton: {
                valid: false,
                click: async () => {
                    component.savePost(component.#auth.user.userId, component.state.postInput.value);
                }
            }
        };
        this.#inputSubscription = this.hydrate.subscribe(this.hydrate.path(this.model.postInput) + ".value", ((change) => {
            this.validateForm(change.state);
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
        this.#inputSubscription.unsubscribe();
    }
    validateForm(text) {
        this.model.submitButton.valid = text.trim().length > 0;
    }
    async savePost(userId, text) {
        const repsonse = await this.#api.writePost(userId, text);
        if (!repsonse.success) {
            this.#logger.error(repsonse.error);
            return;
        }
        this.#disposeSubscriptions();
        this.hydrate.route(HomeRoute.path);
    }
}
