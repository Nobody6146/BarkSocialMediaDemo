import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { SignInRoute } from "../../routes/sign-in/route.js";
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
//******* HTML Template *******/
export let SignUpComponentTemplate = `<template h-model="app.pages.signUp" h-init h-routing="resolve">
    <div class="center-page">
        <div style="display:flex; flex-direction: column; gap: 50px">
            <div class="center" style="flex-direction: column;">
                <img src="images/logo.png" style="width: 200px; padding-left: 30px;">
            </div>
            <div h-model="^" h-property="textContent: ${propName(x => x.errorMessage)}" style="color: var(--color-ui-invalid)">
                Error box
            </div>
            <div class="center" style="display: flex; flex-direction: column; gap: 30px;">
                <input h-component="app-input" placeholder="email address" style="width: 250px"
                h-model="^.${propName(x => x.emailInput)}">
                <input h-component="app-input" placeholder="password" type="password" style="width: 250px"
                h-model="^.${propName(x => x.passwordInput)}">
                <button h-model="^.${propName(x => x.signUpButton)}" h-component="app-button">Sign Up</button>
                <p><a h-model="^" h-attribute="href: ${propName(x => x.signInUrl)}" style="color: var(--color-ui-elements)">Sign In</a></p>
            </div>
        </div>
    </div>
</template>`;
const MIN_PASSWORD_LENGTH = 12;
export class SignUpComponent extends HydrateComponent {
    #auth;
    #emailSubscription;
    #passwordSbscription;
    onInit(eventDetails) {
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
                    catch (error) {
                        component.model.errorMessage = error;
                        console.error(error);
                    }
                }
            },
            errorMessage: "",
            signInUrl: SignInRoute.path
        };
        this.#emailSubscription = this.hydrate.subscribe(this.hydrate.path(this.model.emailInput) + ".value", ((change) => {
            this.validateForm();
        }).bind(this));
        this.#passwordSbscription = this.hydrate.subscribe(this.hydrate.path(this.model.passwordInput) + ".value", ((change) => {
            this.validateForm();
        }).bind(this));
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
        if (this.#emailSubscription)
            this.#emailSubscription.unsubscribe();
        if (this.#passwordSbscription)
            this.#passwordSbscription.unsubscribe();
    }
    validateForm() {
        const email = this.state.emailInput.value.trim();
        const password = this.model.passwordInput.value.trim();
        const errors = [];
        const validEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) != null;
        const validPasswordLength = password.length >= MIN_PASSWORD_LENGTH;
        const passwordCapital = password.match("[A-Z]") != null;
        const passwordNumber = password.match("[0-9]") != null;
        const passwordSymbol = password.match("[^\sa-zA-Z0-9]") != null;
        const validPassword = validPasswordLength && passwordCapital && passwordNumber && passwordSymbol;
        if (email !== "" && !validEmail)
            errors.push("Invalid email format");
        if (password !== "" && !validPassword) {
            if (!validPasswordLength)
                errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
            if (!passwordCapital)
                errors.push(`Password must contain at least one capital`);
            if (!passwordNumber)
                errors.push(`Password must contain at least one number`);
            if (!passwordSymbol)
                errors.push(`Password must contain at least one symbol`);
        }
        this.model.signUpButton.valid = validEmail && validPassword;
        this.model.emailInput.valid = validEmail || email === "";
        this.model.passwordInput.valid = validPassword || password === "";
        this.model.errorMessage = errors.join("\n");
    }
}
