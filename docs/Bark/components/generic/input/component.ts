import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../../lib/hydrate/hydrate.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<InputComponentState<any>, InputComponent> {
    this:InputComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:InputComponentState<any>) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let InputComponentTemplate = `<template h-model h-class="invalid: ${argName(x => x.$state?.valid === false)}" 
 h-property="value: ${propName(x => x.value)}" h-input="value: ${argName(x => x.$element)}.value">
    <style h-style>
        :root {
            color: var(--color-ui-text);
            background-color: var(--color-ui-elements);
            width: 140px;
            padding: 10px;
            border: none;
            border-radius: 7px;
            font-size: 1rem;
        }
        :root.invalid {
            background-color: var(--color-ui-invalid);
        }
    </style>
</template>`;

export interface InputComponentState<T> {
    value?:T;
    valid?:boolean;
}

export class InputComponent extends HydrateComponent<InputComponentState<any>> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}