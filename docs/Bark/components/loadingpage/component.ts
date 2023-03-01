import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../lib/hydrate/hydrate.js";
import { PageState } from "../page/component.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<LoadingPageComponentState, LoadingPageComponent> {
    this:LoadingPageComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:LoadingPageComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let LoadingPageComponentTemplate = `<template h-model>
    <div class="center-page">Loading...</div>
</template>`;

interface LoadingPageComponentState extends PageState {

}

export class LoadingPageComponent extends HydrateComponent<LoadingPageComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}