import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs, HydrateModelChange, HydrateModelSubscription } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../../routes/home/route.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
import { LoggerService } from "../../services/logger/service.js";
import { ButtonComponentState } from "../generic/button/component.js";
import { InputComponentState } from "../generic/input/component.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<NewPostComponentState, NewPostComponent> {
    this:NewPostComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:NewPostComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
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

export interface NewPostComponentState {
    postInput:InputComponentState<string>;
    submitButton:ButtonComponentState;
}

export class NewPostComponent extends HydrateComponent<NewPostComponentState> {

    #inputSubscription:HydrateModelSubscription<string>;
    #api:ApiService;
    #auth:AuthService;
    #logger:LoggerService;

    onInit(eventDetails:HydrateEventDetails):void {
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
        }
        this.#inputSubscription = this.hydrate.subscribe(this.hydrate.path(this.model.postInput) + ".value", ((change:HydrateModelChange<string>) => {
            this.validateForm(change.state);
        }).bind(this));
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {
        this.#disposeSubscriptions();
    }

    #disposeSubscriptions() {
        this.#inputSubscription.unsubscribe();
    }

    validateForm(text:string) {
        this.model.submitButton.valid = text.trim().length > 0;
    }

    async savePost(userId:string, text:string):Promise<void> {
        const repsonse = await this.#api.writePost(userId, text);
        if(!repsonse.success)
        {
            this.#logger.error(repsonse.error);
            return;
        }

        this.#disposeSubscriptions();
        this.hydrate.route(HomeRoute.path);
    }
}