import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../../routes/home/route.js";
import { SearchRoute } from "../../routes/search/route.js";
function argName(exp) {
    return name(exp);
}
function propName(exp) {
    return name(exp);
}
function name(exp) {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}
function navProp(exp) {
    return name(exp);
}
//******* HTML Template *******/
export let NavbarComponentTemplate = `<template h-model="app.navbar" h-init style="display: flex; width: 100%;">
    <style h-style>
        :root {
            color: inherit;
            display: flex;
        }
        
        :root a {
            height: 100%;
            color: var(--color-compliment);
        }
        
        :root a:visited {
            text-decoration: none;
        }
        
        :root .activePage {
            font-weight: bold;
            color: var(--color-text);
        }
    </style>
    <a h-model="^" h-routing="start" h-attribute="href: ${navProp(x => x.url)}; h-route: ${navProp(x => x.url)}" h-class="activePage: window.location.href.includes(${navProp(x => x.url)})"
    class="center" style="padding: 5px; box-sizing: border-box; flex-direction: column; flex-grow: 1;">
        <span class="material-symbols-outlined" h-model="^" h-property="textContent: ${navProp(x => x.icon)}"></span>
    </a>
</template>`;
export class NavbarComponent extends HydrateComponent {
    onInit(eventDetails) {
        this.model = [
            { icon: "home", url: HomeRoute.path },
            { icon: "search", url: SearchRoute.path },
            { icon: "notifications", url: "#n" },
            { icon: "mail", url: "#m" }
        ];
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
