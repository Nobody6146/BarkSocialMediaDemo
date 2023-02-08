import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
export class PageComponent extends HydrateComponent {
    onInit(eventDetails) {
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
    scaffoldRoute(element, detail) {
        const routeAttribute = this.hydrate.attribute(this.hydrate.options.attribute.names.route);
        const page = this.state[detail.modelName];
        element.setAttribute(routeAttribute, page.route);
    }
    scaffoldPage(element, detail) {
        const componentAttribute = this.hydrate.attribute(this.hydrate.options.attribute.names.component);
        const page = this.state[detail.modelName];
        element.setAttribute(componentAttribute, page.component);
    }
    syncDocumentTitle(state) {
        //If we traveled to this link, set the document name
        if (window.location.hash === state.route)
            document.title = state.title;
    }
}
