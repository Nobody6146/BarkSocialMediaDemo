import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../lib/hydrate/hydrate.js";
import { AuthService } from "../../services/auth/service.js";
import { ButtonComponentState } from "../generic/button/component.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<HeaderComponentState, HeaderComponent> {
    this:HeaderComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:HeaderComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let HeaderComponentTemplate = `<template h-model="app.header" h-init>
    <header>
        <div class="center" style="display: flex; justify-content: space-evenly; width: 100%">
            <span>
                <img src="images/logo.png" style="width: 20px; padding: 0 5px;">
                <span h-model="^" h-route="#home" h-routing="start resolve reject" h-property="textContent: window.location.hash">Bark</span>
            </span>
        </div>
        <div class="center" style="position: fixed; right: 20px; height: var(--nav-height);">
            <span h-model="^" h-route="" h-routing="start" h-toggle="hidden: !${argName(x => x.this.authenticated)}">
                <button h-model="^.${propName(x => x.signOutButton)}" h-component="app-button" style="width: 80px">Sign out</button>
            </span>
        </div>
    </header>
</template>`;

export interface HeaderComponentState {
    signOutButton:ButtonComponentState;
}

export class HeaderComponent extends HydrateComponent<HeaderComponentState> {

    #auth:AuthService;

    onInit(eventDetails:HydrateEventDetails):void {
        this.#auth = this.dependency(AuthService);
        this.model = {
            signOutButton: {
                click: function() {
                    this.signOut();
                }.bind(this)
            },
        }
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }

    signOut() {
        this.#auth.signOut();
    }

    get authenticated() {
        return this.#auth.isAuthenticated;
    }
}