import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../../lib/hydrate/hydrate.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<ButtonComponentState, ButtonComponent> {
    this:ButtonComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:ButtonComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}

//******* HTML Template *******/
export let ButtonComponentTemplate = `<template h-model h-on="click: ${argName(x => x.this.click)}()"
 h-toggle="disabled: ${argName(x => x.$state?.valid)} === false">
    <style h-style>
        :root {
            color: var(--color-ui-text);
            background-color: var(--color-ui-elements);
            width: 140px;
            padding: 10px;
            border: none;
            border-radius: 7px;
            font-size: 1rem;
            text-align: center;
        }
        
        :root[disabled] {
            opacity: .5;
        }
        </style>
</template>`;

export interface ButtonComponentState {
    click?:() => void;
    valid?:boolean;
}

export class ButtonComponent extends HydrateComponent<ButtonComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }

    click() {
        const action = this.state?.click;
        if(!action)
            return;
        action();
    }
}