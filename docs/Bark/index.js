import { HydrateApp, HydrateAppOptions } from "./lib/hydrate/hydrate.js";
import { AppRoutes } from "./routes.js";
import { AppServices } from "./services.js";
export class App {
    #hydrate;
    #routes;
    constructor() {
        const opts = this.#configureOptions();
        this.#hydrate = new HydrateApp(opts);
        this.#routes = [];
    }
    get hydrate() {
        return this.#hydrate;
    }
    async start() {
        //Performs setup of the client side router to process requests
        //Comment this line out if you don't wish to utilize the router
        this.#configureRouter();
        //Load all of our app dependencies
        await this.#loadDependencies();
        //Tell the framework to start running
        this.#hydrate.start();
        //Tell the framework to resolve the route of the current page
        //Comment this line out if you don't wish to utilize the router
        this.#hydrate.route();
    }
    #configureOptions() {
        //Provide any custom configuration for the framework
        return new HydrateAppOptions();
    }
    async #loadDependencies() {
        //Configure our services
        for (let dependency of AppServices) {
            switch (dependency.type) {
                case "singleton":
                    this.#hydrate.singleton(dependency.definition, dependency.factory);
                    break;
                case "scoped":
                    this.#hydrate.scoped(dependency.definition, dependency.factory);
                    break;
                case "transient":
                    this.#hydrate.transient(dependency.definition, dependency.factory);
                    break;
            }
        }
    }
    #configureRouter() {
        //Define our application routes and add in middleware
        this.#routes = AppRoutes;
        //Subscribe to the routing event to handle client side routing
        document.addEventListener("hydrate.routing.start", this.#clientSideRouting.bind(this));
    }
    async #clientSideRouting(event) {
        //Load the routing attempt
        const request = event.detail.request;
        try {
            //Determine which routes we matched
            const matches = request.match(request.url, ...this.#routes);
            for (let match of matches) {
                //Execute the route/middleware
                if (match.route.action)
                    await match.route.action(request);
                //If we told the framework we've finished processing, then terminate executing the remainning routes/middleware
                if (request.handled)
                    return;
            }
        }
        catch (error) {
            console.error(error);
        }
        //If we fail to fully process handle a route, then reject it and generate an error event
        request.reject();
    }
}
