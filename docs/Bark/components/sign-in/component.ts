import { ButtonComponentState } from "../generic/button/component.js";
import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs, HydrateModelChange, HydrateModelSubscription } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../../routes/home/route.js";
import { SignUpRoute } from "../../routes/sign-up/route.js";
import { AuthService } from "../../services/auth/service.js";
import { InputComponentState } from "../generic/input/component.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<SignInComponentState, SignInComponent> {
    this:SignInComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:SignInComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let SignInComponentTemplate = `<template h-model="app.pages.signIn" h-init h-routing="resolve">
    <div class="center-page">
        <div style="display:flex; flex-direction: column; gap: 50px">
            <div class="center" style="flex-direction: column;">
                <img src="images/logo.png" style="width: 200px; padding-left: 30px;">
            </div>
            <div h-model="^" h-property="textContent: errorMessage" style="color: var(--color-ui-invalid)">
                Error box
            </div>
            <div class="center" style="display: flex; flex-direction: column; gap: 30px;">
                <input h-component="app-input" placeholder="email address" style="width: 250px"
                h-model="^.${propName(x => x.emailInput)}">
                <input h-component="app-input" placeholder="password" type="password" style="width: 250px"
                h-model="^.${propName(x => x.passwordInput)}">
                <button h-model="^.${propName(x => x.signInButton)}" h-component="app-button">Sign In</button>
                <p><a h-model="^" h-attribute="href: ${propName(x => x.signUpUrl)}">Create Account</a></p>
            </div>
        </div>
    </div>
</template>`

export interface SignInComponentState {
    emailInput:InputComponentState<string>;
    passwordInput:InputComponentState<string>;
    signInButton:ButtonComponentState;
    errorMessage:string;
    signUpUrl:string;
}

export class SignInComponent extends HydrateComponent<SignInComponentState> {

    #auth:AuthService;
    #emailSubscription:HydrateModelSubscription<string>
    #passwordSbscription:HydrateModelSubscription<string>

    onInit(eventDetails:HydrateEventDetails):void {
        this.#auth = this.dependency(AuthService);
        const component = this;
        this.model = {
            emailInput: {
                value: "",
                valid: true,
            },
            passwordInput: {
                value: "",
                valid: true,
            },
            signInButton: {
                valid: false,
                click: async () => {
                    const form = component.state;
                    try {
                        const result = await component.#auth.signIn(form.emailInput.value, form.passwordInput.value);
                        component.hydrate.route(HomeRoute.path);
                    }
                    catch(error) {
                        component.model.errorMessage = error;
                        console.error(error);
                    }
                }
            },
            errorMessage: null,
            signUpUrl: SignUpRoute.path
        }

        this.#emailSubscription = this.hydrate.subscribe(this.hydrate.path(this.model.emailInput) + ".value", ((change:HydrateModelChange<string>) => {
            this.validateForm();
        }).bind(this));
        this.#passwordSbscription = this.hydrate.subscribe(this.hydrate.path(this.model.passwordInput) + ".value", ((change:HydrateModelChange<string>) => {
            this.validateForm();
        }).bind(this));
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {
        if(this.#emailSubscription)
            this.#emailSubscription.unsubscribe();
        if(this.#passwordSbscription)
            this.#passwordSbscription.unsubscribe();
    }

    validateForm() {
        this.model.signInButton.valid = this.state.emailInput.value.trim() !== "" && this.state.passwordInput.value.trim() !== "";
    }
}