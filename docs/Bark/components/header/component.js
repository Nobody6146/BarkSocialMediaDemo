import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
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
export class HeaderComponent extends HydrateComponent {
    #auth;
    onInit(eventDetails) {
        this.#auth = this.dependency(AuthService);
        this.model = {
            signOutButton: {
                click: function () {
                    this.signOut();
                }.bind(this)
            },
        };
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
    signOut() {
        this.#auth.signOut();
    }
    get authenticated() {
        return this.#auth.isAuthenticated;
    }
}
