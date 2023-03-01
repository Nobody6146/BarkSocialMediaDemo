import { HydrateComponent } from "../../../lib/hydrate/hydrate.js";
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
export class ButtonComponent extends HydrateComponent {
    onInit(eventDetails) {
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
    click() {
        const action = this.state?.click;
        if (!action)
            return;
        action();
    }
}
