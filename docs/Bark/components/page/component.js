import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
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
export let PageComponentTemplate = `<template>
    <div h-model="^" h-scaffold="${argName(x => x.this.scaffoldRoute)}(${argName(x => x.$element)}, ${argName(x => x.$detail)})"
    h-routing="start" h-attribute="h-route: route" h-event="*: ${argName(x => x.this.syncDocumentTitle)}(${argName(x => x.$state)})">
        <app-loadingpage h-model="^" h-routing="start"></app-loadingpage>
        <div h-lazy h-routing="resolve" h-scaffold="${argName(x => x.this.scaffoldPage)}(${argName(x => x.$element)}, ${argName(x => x.$detail)})"></div>
        <app-errorpage></app-errorpage>
    </div>
</template>`;
export class PageComponent extends HydrateComponent {
    onInit(eventDetails) {
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
    scaffoldRoute(element, detail) {
        const routeAttribute = this.hydrate.attribute(this.hydrate.options.attribute.names.route);
        const page = this.state[detail.modelName];
        element.setAttribute(routeAttribute, page.route);
    }
    scaffoldPage(element, detail) {
        const componentAttribute = this.hydrate.attribute(this.hydrate.options.attribute.names.component);
        const page = this.state[detail.modelName];
        element.setAttribute(componentAttribute, page.component);
    }
    syncDocumentTitle(state) {
        //If we traveled to this link, set the document name
        if (window.location.hash === state.route)
            document.title = state.title;
    }
}
