import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../lib/hydrate/hydrate.js";
import { AppRoutes } from "../../routes.js";
import { NavbarComponentState } from "../navbar/component.js";
import { PageComponentState } from "../page/component.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<RootComponentState, RootComponent> {
    this:RootComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:RootComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let RootComponentTemplate = `<template h-model="app" h-init>
    <style h-style>
        :root {
            width: 100%;
            height: 100%;
        }    
    </style>
    <app-header></app-header>
    <main>
        <!-- <app-js-comp></app-js-comp> -->
        <app-page h-model="^.${propName(x => x.pages)}"></app-page>
        <!-- <app-home h-route="#home" h-lazy></app-home> -->
    </main>
    <footer>
        <!-- <p>
            <i>Hydrate 2023</i>
        </p> -->
        <app-navbar h-model="^.navbar"></app-navbar>
    </footer>
</template>`;

export interface RootComponentState {
    text:string;
    pages: PageComponentState,
    // navbar:NavbarComponentState
}

const APP_NAME:string = "Demo";

export class RootComponent extends HydrateComponent<RootComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        const routes = AppRoutes.filter(x => x.path.match(/\w+/)).map(x => { return {
            title: x.name ?? `${x.path.substring(1, 2).toUpperCase()}${x.path.substring(2)}`,
            route: x.path,
            component: `app-${x.path.substring(1).replace(/\/:(\w+)/g, "").replace(/\//g, "-")}`
        }});
        this.model = {
            text: "Hello world",
            pages: routes.map(x => { return {
                title: `${APP_NAME} - ${x.title}`,
                name: x.title,
                route: x.route,
                component: x.component
            }}),
            // navbar: [

            // ]
        };
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}