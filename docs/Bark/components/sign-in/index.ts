import { ButtonComponentState } from "../../components/generic/button/index.js";
import { HydrateComponent, HydrateEventDetails, HydrateModelChange, HydrateModelSubscription } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../../routes/home/route.js";
import { SignUpRoute } from "../../routes/sign-up/route.js";
import { AuthService } from "../../services/auth/service.js";
import { InputComponentState } from "../generic/input/index.js";

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