import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs, HydrateScaffoldEventDetails } from "../../lib/hydrate/hydrate.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<PageComponentState, PageComponent> {
    this:PageComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:PageComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
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

export interface PageState {
    title:string;
    name:string;
    route:string;
    component:string;
}

export type PageComponentState = PageState[];


export class PageComponent extends HydrateComponent<PageComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }

    scaffoldRoute(element:HTMLElement, detail:HydrateScaffoldEventDetails) {
        const routeAttribute = this.hydrate.attribute(this.hydrate.options.attribute.names.route);
        const page:PageState = this.state[detail.modelName];
        element.setAttribute(routeAttribute, page.route);
    }

    scaffoldPage(element:HTMLElement, detail:HydrateScaffoldEventDetails) {
        const componentAttribute = this.hydrate.attribute(this.hydrate.options.attribute.names.component);
        const page:PageState = this.state[detail.modelName];
        element.setAttribute(componentAttribute, page.component);
    }

    syncDocumentTitle(state:PageState) {
        //If we traveled to this link, set the document name
        if(window.location.hash === state.route)
            document.title = state.title;
    }
}