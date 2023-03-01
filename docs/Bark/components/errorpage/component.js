import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { LoggerService } from "../../services/logger/service.js";
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
export let ErrorPageComponentTemplate = `<template h-model h-routing="reject">
    <div>
        Error loading page
    </div>
</template>`;
export class ErrorPageComponent extends HydrateComponent {
    onInit(eventDetails) {
    }
    onPreRender(eventDetails) {
        this.dependency(LoggerService).error("Could not resolve route");
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
}
