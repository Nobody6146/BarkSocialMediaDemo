import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../lib/hydrate/hydrate.js";
import { LoggerService } from "../../services/logger/service.js"

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<ErrorPageComponentState, ErrorPageComponent> {
    this:ErrorPageComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:ErrorPageComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let ErrorPageComponentTemplate = `<template h-model h-routing="reject">
    <div>
        Error loading page
    </div>
</template>`;

interface ErrorPageComponentState {
    
}

export class ErrorPageComponent extends HydrateComponent<ErrorPageComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {
        this.dependency(LoggerService).error("Could not resolve route");
    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}