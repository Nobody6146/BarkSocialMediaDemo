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
export class InputComponent extends HydrateComponent {
    onInit(eventDetails) {
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
