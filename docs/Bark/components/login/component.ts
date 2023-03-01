import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../lib/hydrate/hydrate.js";
import { SignInRoute } from "../../routes/sign-in/route.js";
import { SignUpRoute } from "../../routes/sign-up/route.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<LoginComponentState, LoginComponent> {
    this:LoginComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:LoginComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let LoginComponentTemplate = `<template h-model="app.page.login" h-init h-routing="resolve">
    <div class="center-page">
        <div style="display:flex; flex-direction: column; gap: 50px">
            <div class="center" style="flex-direction: column;">
                <img src="images/logo.png" style="width: 200px; padding-left: 30px;">
            </div>
            <div class="center" style="display: flex; flex-direction: column; gap: 30px;">
                <a h-component="app-button" h-model="^" h-attribute="href: ${propName(x => x.signInUrl)}">Sign In</a>
                <a h-component="app-button" h-model="^" h-attribute="href: ${propName(x => x.signUpUrl)}">Sign Up</a>
            </div>
        </div>
    </div>
</template>`;

export interface LoginComponentState {
    signInUrl:string;
    signUpUrl:string;
}

export class LoginComponent extends HydrateComponent<LoginComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        this.model = {
            signInUrl: SignInRoute.path,
            signUpUrl: SignUpRoute.path
        }
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}