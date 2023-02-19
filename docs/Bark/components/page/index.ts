import { HydrateComponent, HydrateEventDetails, HydrateScaffoldEventDetails } from "../../lib/hydrate/hydrate.js";

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