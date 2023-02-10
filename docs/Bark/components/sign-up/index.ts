import { ButtonComponentState } from "../../components/generic/button/index.js";
import { HydrateComponent, HydrateEventDetails, HydrateModelChange, HydrateModelSubscription } from "../../lib/hydrate/hydrate.js";
import { SignInRoute } from "../../routes/sign-in/route.js";
import { AuthService } from "../../services/auth/service.js";
import { InputComponentState } from "../generic/input/index.js";

export interface SignUpComponentState {
    emailInput:InputComponentState<string>,
    passwordInput:InputComponentState<string>,
    signUpButton:ButtonComponentState,
    errorMessage:string;
    signInUrl:string;
}

const MIN_PASSWORD_LENGTH = 12;

export class SignUpComponent extends HydrateComponent<SignUpComponentState> {
    #auth:AuthService;

    #emailSubscription:HydrateModelSubscription<string>
    #passwordSbscription:HydrateModelSubscription<string>

    onInit(eventDetails:HydrateEventDetails):void {
        this.#auth = this.dependency(AuthService);
        const component = this;
        this.model = {
            emailInput: {
                value: ""
            },
            passwordInput: {
                value: ""
            },
            signUpButton: {
                valid: false,
                click: async () => {
                    const form = component.state;
                    try {
                        const result = await component.#auth.signUp(form.emailInput.value, form.passwordInput.value);
                        component.hydrate.route(SignInRoute.path);
                    }
                    catch(error) {
                        component.model.errorMessage = error;
                        console.error(error);
                    }
                }
            },
            errorMessage: "",
            signInUrl: SignInRoute.path
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
        const email = this.state.emailInput.value.trim();
        const password = this.model.passwordInput.value.trim();
        const errors:string[] = [];

        const validEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) != null;
        const validPasswordLength = password.length >= MIN_PASSWORD_LENGTH;
        const passwordCapital = password.match("[A-Z]") != null;
        const passwordNumber = password.match("[0-9]") != null;
        const passwordSymbol = password.match("[^\sa-zA-Z0-9]") != null;
        const validPassword = validPasswordLength && passwordCapital && passwordNumber && passwordSymbol;
        
        if(email !== "" && !validEmail)
            errors.push("Invalid email format");
        if(password !== "" && !validPassword)
        {
            if(!validPasswordLength)
                errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
            if(!passwordCapital)
                errors.push(`Password must contain at least one capital`);
            if(!passwordNumber)
                errors.push(`Password must contain at least one number`);
            if(!passwordSymbol)
                errors.push(`Password must contain at least one symbol`);
        }

        this.model.signUpButton.valid = validEmail && validPassword;
        this.model.emailInput.valid = validEmail || email === "";
        this.model.passwordInput.valid = validPassword || password === "";
        this.model.errorMessage = errors.join("\n");
    }
}