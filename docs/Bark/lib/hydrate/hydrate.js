export let HydrateAppVersion = "1.2.0";
export class HydrateAppOptions {
    dom;
    model;
    attribute;
    router;
    debug;
    constructor() {
        this.dom = new HydrateDomOptions();
        this.model = new HydrateModelOptions();
        this.attribute = new HydrateAttributeOptions();
        this.router = new HydrateRouterOptions();
        this.debug = new HydrateDebugOptions();
    }
}
export class HydrateDebugOptions {
    dispatchTimer;
    constructor() {
        this.dispatchTimer = false;
    }
}
export class HydrateRouterOptions {
    hashRouting = true;
}
export class HydrateDomOptions {
    rootSelector = "body";
}
export class HydrateModelOptions {
    baseProperty;
    parentProperty;
    nameProperty;
    pathProperty;
    stateProperty;
    constructor() {
        this.baseProperty = "__base";
        this.parentProperty = "__parent";
        this.nameProperty = "__name";
        this.pathProperty = "__path";
        this.stateProperty = "__state";
    }
}
export class HydrateAttributeOptions {
    names;
    handlers;
    standardPrefix;
    customPrefix;
    trackables;
    constructor() {
        this.names = new HydrateAttributeNamesOptions();
        this.handlers = new Map();
        this.standardPrefix = "h";
        this.customPrefix = "hc";
        this.trackables = [];
    }
}
export class HydrateAttributeNamesOptions {
    //Linking
    model;
    nested; //Will also respond to nested property changes
    init; //Will initialize the model if it isn't
    resume; //Will signify that the DOM element is to resume functionality on changes, but not apon tracking
    bind; //Will load the JSON from the script and bind it to the model
    silent; //Signifies that the script tag will load the model silently (avoid framework state changes)
    //Basic element manipulation
    property;
    attribute;
    toggle; //Toggles an attribute
    class; //Toggles the inclusion of a class to an element
    remove; //removes an element
    //Binding
    input;
    mutation;
    lazy;
    mock; //Used for mocking which attributes are linked to which model
    //Conditionals
    //static = "static"; //Executes once
    if; //if the element should respond
    filter; //Filter on certain model properties
    //Functions and execution
    event; //Calls a callback any time the framework event type is triggered
    on; //Fires a callback when the "on" event of the element is fired
    //Templating and Components
    script; //denotes a script tag that is the class definiton of the component
    style; //denotes a style tag that is the styling for the component
    template; //template changes queries user of the templates then regenerate
    component; //="[PROP] [TEMPLATE] [property | model | array | dictionary | map]?
    shadow; //whether the shadow dom should be used or not
    source; //tells component the source url for a resource
    duplicate; //Duplicates the component x times 
    id; //Places an id
    scaffold; //Lets you execute code for the element when it's section has been generated for the component (before it is added to the dom)
    //Routing
    route; //Mark a route associated with this element
    routing; //Mark the element to say which router events it's responding to
    //Execution and Timing
    delay;
    debounce;
    throttle;
    // customs:string[] = []; 
    constructor() {
        //Linking
        this.model = "model";
        this.nested = "nested"; //Will also respond to nested property changes
        this.init = "init";
        this.resume = "resume"; //Will signify that the DOM element is to resume functionality on changes, but not apon tracking
        this.bind = "bind"; //Will load the JSON from the script and bind it to the model
        this.silent = "silent"; //Signifies that the script tag will load the model silently (avoid framework state changes)
        //Basic element manipulation
        this.property = "property";
        this.attribute = "attribute";
        this.toggle = "toggle"; //Toggles an attribute
        this.class = "class"; //Toggles the inclusion of a class to an element
        this.remove = "remove"; //removes an element
        //Binding
        this.input = "input";
        this.mutation = "mutation";
        this.lazy = "lazy";
        this.mock = "mock";
        //Conditionals
        this.if = "if";
        this.filter = "filter";
        //Functions and execution
        this.event = "event"; //Calls a callback any time the framework event type is triggered
        this.on = "on"; //Fires a callback when the "on" event of the element is fired
        //Templating and Components
        this.script = "script";
        this.style = "style";
        this.template = "template"; //template changes queries user of the templates then regenerate
        this.component = "component"; //="[PROP] [TEMPLATE] [property | model | array | dictionary | map]?
        this.shadow = "shadow";
        this.source = "source";
        this.duplicate = "duplicate"; //Duplicates the component x times 
        this.id = "id"; //Places an id
        this.scaffold = "scaffold";
        //Routing
        this.route = "route"; //Mark a route associated with this element
        this.routing = "routing"; //Mark the element to say which router events it's responding to
        //Execution and Timing
        this.delay = "delay";
        this.debounce = "debounce";
        this.throttle = "throttle";
        // customs:string[] = []; 
    }
}
export class HydrateElementTrackingEvent extends CustomEvent {
    constructor(detail) {
        super(detail.hydrate.event(detail.type), {
            detail: detail,
            bubbles: true,
            cancelable: true
        });
    }
}
export class HydrateModelEvent extends CustomEvent {
    constructor(detail) {
        super(detail.hydrate.event(detail.type), {
            detail: detail,
            bubbles: true,
            cancelable: true
        });
    }
}
export class HydrateRouteEvent extends CustomEvent {
    constructor(detail) {
        super(detail.hydrate.event(detail.type), {
            detail: detail,
            bubbles: true,
            cancelable: true
        });
    }
}
export class HydrateElementMutationEvent extends CustomEvent {
    constructor(detail) {
        super(detail.hydrate.event(detail.type), {
            detail: detail,
            bubbles: true,
            cancelable: true
        });
    }
}
export class HydrateElementEventListenerEvent extends CustomEvent {
    constructor(detail) {
        super(detail.hydrate.event(detail.type), {
            detail: detail,
            bubbles: true,
            cancelable: true
        });
    }
}
export class HydrateElementInputEvent extends CustomEvent {
    constructor(detail) {
        super(detail.hydrate.event(detail.type), {
            detail: detail,
            bubbles: true,
            cancelable: true
        });
    }
}
export class HydrateEventDetails {
    hydrate;
    element;
    type;
    baseName;
    modelName;
    modelPath;
    propName;
    propPath;
    parentPath;
    parentName;
    constructor(hydrate, element, eventType, baseName, parentName, parentPath, modelName, modelPath, propName, propPath) {
        this.hydrate = hydrate;
        this.element = element;
        this.type = eventType;
        this.baseName = baseName;
        this.parentName = parentName;
        this.parentPath = parentPath;
        this.modelPath = modelPath;
        this.modelName = modelName;
        this.propPath = propPath;
        this.propName = propName;
    }
    get base() {
        return this.hydrate.model(this.baseName);
    }
    get parent() {
        return this.hydrate.model(this.parentPath);
    }
    get model() {
        return this.hydrate.model(this.modelPath);
    }
    set model(value) {
        //The assumptions in this method aren't always correct...
        const parent = this.parent;
        if (parent)
            parent[this.modelName] = value;
        else
            this.hydrate.bind(this.modelName, value);
    }
    get state() {
        return this.hydrate.state(this.modelPath);
    }
    get prop() {
        return this.hydrate.state(this.propPath);
    }
}
export class HydrateElementTrackingEventDetails extends HydrateEventDetails {
    constructor(hydrate, element, eventType, properties) {
        super(hydrate, element, eventType, properties.baseName, properties.parentName, properties.parentPath, properties.modelName, properties.modelPath, properties.propName, properties.propPath);
    }
}
export class HydrateModelEventDetails extends HydrateEventDetails {
    nested;
    constructor(hydrate, element, eventType, properties, nested) {
        super(hydrate, element, eventType, properties.baseName, properties.parentName, properties.parentPath, properties.modelName, properties.modelPath, properties.propName, properties.propPath);
        this.nested = nested;
    }
}
export class HydrateElementMutationEventDetails extends HydrateEventDetails {
    mutation;
    constructor(hydrate, element, eventType, properties, mutation) {
        super(hydrate, element, eventType, properties.baseName, properties.parentName, properties.parentPath, properties.modelName, properties.modelPath, properties.propName, properties.propPath);
        this.mutation = mutation;
    }
}
export class HydrateElementInputEventDetails extends HydrateEventDetails {
    event;
    constructor(hydrate, element, eventType, properties, event) {
        super(hydrate, element, eventType, properties.baseName, properties.parentName, properties.parentPath, properties.modelName, properties.modelPath, properties.propName, properties.propPath);
        this.event = event;
    }
}
export class HydrateElementEventListenerEventDetails extends HydrateEventDetails {
    event;
    constructor(hydrate, element, eventType, properties, event) {
        super(hydrate, element, eventType, properties.baseName, properties.parentName, properties.parentPath, properties.modelName, properties.modelPath, properties.propName, properties.propPath);
        this.event = event;
    }
}
export class HydrateRouteEventDetails extends HydrateEventDetails {
    request;
    constructor(hydrate, element, eventType, properties, request) {
        super(hydrate, element, eventType, properties.baseName, properties.parentName, properties.parentPath, properties.modelName, properties.modelPath, properties.propName, properties.propPath);
        this.request = request;
    }
}
export class HydrateScaffoldEventDetails extends HydrateEventDetails {
    buildDetail;
    constructor(hydrate, element, eventType, properties, buildDetail) {
        super(hydrate, element, eventType, properties.baseName, properties.parentName, properties.parentPath, properties.modelName, properties.modelPath, properties.propName, properties.propPath);
        this.buildDetail = buildDetail;
    }
}
export class HydrateRouteRequest {
    hydrate;
    path;
    url;
    pathname;
    search;
    hash;
    state;
    response; //Empty field where you can attach any data needed by your handling code
    #finished;
    #resolved;
    #rejected;
    #redirectRequest;
    #routingState;
    constructor(hydrate, url, state, finished, routingState) {
        this.hydrate = hydrate;
        this.path = this.#determineRoutePath(url);
        this.pathname = url.pathname;
        this.search = url.search;
        this.hash = url.hash;
        this.url = url.href;
        this.state = state;
        this.response = null;
        this.#finished = finished;
        this.#resolved = false;
        this.#rejected = false;
        this.#redirectRequest = null;
        this.#routingState = routingState;
    }
    #determineRoutePath(url) {
        return !this.hydrate.options.router.hashRouting ? url.pathname
            : (url.hash === "" ? "#" : url.hash);
    }
    #routeToRegex(route) {
        if (!route == null || route === "")
            return new RegExp(".*");
        let regex = route.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)");
        return RegExp("^" + regex + "$");
    }
    #getRouteParams(route, match) {
        let params = {};
        let keys = route.match(/:(\w+)/g);
        if (keys)
            for (let i = 0; i < keys.length; i++)
                params[keys[i].substring(1)] = match[i + 1];
        return params;
    }
    ;
    #getQueryParams(search) {
        let query = {};
        location.search.substring(1, search.length).split("&").forEach(x => {
            let [name, value] = x.split("=");
            if (name === "")
                return;
            let variable = query[name];
            if (variable == null)
                query[name] = value;
            else {
                if (!Array.isArray(variable))
                    query[name] = [variable];
                query[name].push(value);
            }
        });
        return query;
    }
    get handled() {
        return this.resolved || this.rejected || this.redirected;
    }
    get resolved() {
        return this.#resolved;
    }
    get redirected() {
        return this.#redirectRequest != null;
    }
    get rejected() {
        return this.#rejected;
    }
    /**
     * Attempts to resolve the route. If it fails, you'll return null
     */
    match(uri, ...routes) {
        let url = new URL(uri);
        let results = [];
        let path = this.#determineRoutePath(url);
        for (let route of routes) {
            if (typeof route === "string") {
                route = {
                    path: route
                };
            }
            let regexRoute = this.#routeToRegex(route.path);
            let match = path.match(regexRoute);
            if (match)
                results.push({
                    url: path,
                    route: route,
                    params: this.#getRouteParams(route.path, match),
                    query: this.#getQueryParams(url.search),
                });
        }
        return results.length > 0
            ? results : null;
    }
    resolve() {
        this.#resolved = true;
        this.#rejected = false;
        this.#redirectRequest = null;
        if (this.#finished()) {
            this.#routingState.url = this.url;
            this.#routingState.eventType = "routing.resolve";
            this.hydrate.dispatch(this.hydrate.root, "routing.resolve", undefined, this);
        }
    }
    reject() {
        this.#resolved = false;
        this.#rejected = true;
        this.#redirectRequest = null;
        if (this.#finished()) {
            this.#routingState.url = this.url;
            this.#routingState.eventType = "routing.reject";
            this.hydrate.dispatch(this.hydrate.root, "routing.reject", undefined, this);
        }
    }
    redirect(url, state) {
        this.#resolved = false;
        this.#rejected = false;
        this.#redirectRequest = {
            url: url ?? this.#redirectRequest?.url,
            state: state ?? this.#redirectRequest?.state
        };
        if (this.#finished()) {
            this.#routingState.url = this.url;
            this.#routingState.eventType = "routing.start";
            this.hydrate.route(this.#redirectRequest.url, this.#redirectRequest.state);
        }
    }
}
export class HydrateComponent {
    #hydrate;
    #element;
    constructor(data) {
        this.#hydrate = data.hydrate;
        this.#element = data.element;
    }
    get hydrate() {
        return this.#hydrate;
    }
    get root() {
        return this.#element;
    }
    get modelPath() {
        return this.#element.getAttribute(this.#hydrate.attribute(this.#hydrate.options.attribute.names.model));
    }
    get model() {
        return this.#hydrate.model(this.modelPath);
    }
    set model(value) {
        this.#hydrate.bind(this.modelPath, value);
    }
    get state() {
        return this.#hydrate.state(this.modelPath);
    }
    dependency(definition) {
        return this.#hydrate.dependency(definition, this.#element).instance;
    }
    onInit(eventDetails) { }
    onPreRender(eventDetails) { }
    onPostRender(eventDetails) { }
    onDestroy() { }
}
export class HydrateModelSubscription {
    #hydrate;
    modelPath;
    callback;
    #mockEvnet;
    constructor(hydrate, modelPath, callback, mockEvent) {
        this.#hydrate = hydrate;
        this.modelPath = modelPath;
        this.callback = callback;
        this.#mockEvnet = mockEvent;
    }
    subscribe() {
        //@ts-ignore
        this.#hydrate.root.addEventListener(this.#hydrate.event("bind"), this.callback);
        //@ts-ignore
        this.#hydrate.root.addEventListener(this.#hydrate.event("set"), this.callback);
        //@ts-ignore
        this.#hydrate.root.addEventListener(this.#hydrate.event("unbind"), this.callback);
    }
    unsubscribe() {
        //@ts-ignore
        this.#hydrate.root.removeEventListener(this.#hydrate.event("bind"), this.callback);
        //@ts-ignore
        this.#hydrate.root.removeEventListener(this.#hydrate.event("set"), this.callback);
        //@ts-ignore
        this.#hydrate.root.removeEventListener(this.#hydrate.event("unbind"), this.callback);
    }
    trigger() {
        this.callback(this.#mockEvnet);
    }
    get model() {
        return this.#hydrate.model(this.modelPath);
    }
    get state() {
        return this.#hydrate.state(this.modelPath);
    }
}
export class HydrateAppService {
}
export class HydrateApp {
    #dispatchId = 0;
    #options;
    #htmlExcecuters; //element name -> event type -> model.prop -> callbacks
    #onDomEventListeners; //A list of dynamic (h-on) event listeners added by the framework
    #elementHandlerDelays;
    #root;
    #models;
    #dependencies; //Any source object (typically HydrateComponent) as the key, "null" will be a singleton
    #mutationObserver;
    #intersectionObserver;
    #componentTypes;
    #components;
    #routingState;
    #lazyElements;
    constructor(options) {
        this.#options = { ...new HydrateAppOptions(), ...options };
        this.#htmlExcecuters = new Map();
        this.#onDomEventListeners = new Map();
        this.#elementHandlerDelays = new Map();
        this.#root = document.querySelector(this.#options.dom.rootSelector);
        this.#models = {};
        this.#componentTypes = new Map();
        this.#components = new Map();
        this.#dependencies = new Map();
        this.#lazyElements = new Set();
        this.#addTrackableAttributes();
        this.#addStandardAttributeHandlers();
        this.#routingState = {
            url: null,
            eventType: null
        };
    }
    async start() {
        this.#mutationObserver = this.#observeDom(this.#root);
        this.root.addEventListener("input", this.#inputListener.bind(this));
        window.addEventListener("popstate", this.#popStateListener.bind(this));
        this.#intersectionObserver = new IntersectionObserver(this.#intersectionCallback.bind(this));
        await this.#bindScriptModels();
        await this.#loadTemplates();
        this.#trackLazyElements();
        this.#trackElements();
        //this.#linkComponents();
    }
    get root() {
        return this.#root;
    }
    get options() {
        return this.#options;
    }
    singleton(definition, factory) {
        return this.#addDependency(definition, "singleton", factory);
    }
    scoped(definition, factory) {
        return this.#addDependency(definition, "scoped", factory);
    }
    transient(definition, factory) {
        return this.#addDependency(definition, "transient", factory);
    }
    #addDependency(definition, type = "singleton", factory) {
        const dependency = {
            type: type,
            instances: new Map(),
            factory: factory ?? function (hydrate) { return new definition(); }
        };
        this.#dependencies.set(definition, dependency);
        return null;
    }
    #getDependency(definition, source) {
        //Gets or instiates dependency
        const configuration = this.#dependencies.get(definition);
        if (configuration == null)
            throw new Error("dependency not configured");
        //If we we are a singleton, we have an undefined source
        if (configuration.type === "singleton")
            source = this;
        const dispose = function () {
            configuration.instances.delete(source);
        };
        let dependency = configuration.instances.get(source);
        if (dependency == null || configuration.type === "transient") {
            const hydrate = this;
            if (dependency != null)
                dependency.dispose();
            //We'll pass an instance of hydrate so the caller can store it and get other dependencies
            dependency = { instance: configuration.factory(hydrate, source), dispose };
            configuration.instances.set(source, dependency);
        }
        return dependency;
    }
    dependency(definition, source) {
        return this.#getDependency(definition, source);
    }
    #observeDom(node) {
        const observer = new MutationObserver(this.#mutationCallback.bind(this));
        observer.observe(node, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            characterDataOldValue: true,
            //attributeFilter: [...this.#options.attribute.trackables],
        });
        return observer;
    }
    route(url, state) {
        if (url == null) {
            url = window.location.href;
            state = history.state;
        }
        if (state == null) {
            state = {};
        }
        history.pushState(state, '', url);
        this.#navigateTo(location.href, state);
    }
    #navigateTo(uri, state) {
        let url = new URL(uri);
        let finished = false;
        let isFinished = function () {
            return finished;
        };
        let request = new HydrateRouteRequest(this, url, state, isFinished, this.#routingState);
        this.#routingState.url = request.url;
        this.#routingState.eventType = "routing.start";
        let preventedDefault = this.dispatch(this.#root, "routing.start", undefined, request);
        finished = true;
        if (preventedDefault)
            return;
        if (request.resolved)
            return request.resolve();
        if (request.rejected)
            return request.reject();
        if (request.redirected)
            return request.redirect();
    }
    #popStateListener(event) {
        this.#navigateTo(window.location.href, event.state);
    }
    /**
     *
     * @param name the root "name" of the attribute. For standard attributes, it is the option property name. For customs, it's just the name
     * @returns The full formatted attribute name with prefix
     */
    attribute(name) {
        let key = this.#options.attribute.names[name];
        if (key === undefined || name === "customs") {
            return `${this.#options.attribute.customPrefix}-${name}`;
        }
        return `${this.#options.attribute.standardPrefix}-${key}`;
    }
    event(type) {
        return `hydrate.${type}`;
    }
    resolveObjectValue(startValue, propPath) {
        let nameParts = propPath.split(".");
        let state = startValue;
        for (let i = 0; i < nameParts.length; i++) {
            if (!(state instanceof Object))
                return undefined;
            state = state[nameParts[i]];
        }
        return state;
    }
    state(model) {
        if (typeof model === "string")
            model = this.model(model);
        if (model == undefined || !(model instanceof Object))
            return model;
        return model[this.options.model.stateProperty];
    }
    model(path) {
        if (path == null)
            return undefined;
        path = path.trim();
        if (path === "")
            return undefined;
        return this.resolveObjectValue(this.#models, path);
    }
    base(model) {
        if (typeof model === "string")
            model = this.model(model);
        if (model == undefined || !(model instanceof Object))
            return undefined;
        return model[this.options.model.baseProperty];
    }
    parent(model) {
        if (typeof model === "string")
            model = this.model(model);
        if (model == undefined || !(model instanceof Object))
            return undefined;
        return model[this.options.model.parentProperty];
    }
    name(model) {
        if (typeof model === "string")
            model = this.model(model);
        if (model == undefined || !(model instanceof Object))
            return undefined;
        return model[this.options.model.nameProperty];
    }
    path(model) {
        if (typeof model === "string")
            model = this.model(model);
        if (model == undefined || !(model instanceof Object))
            return undefined;
        return model[this.options.model.pathProperty];
    }
    /** Bind a new model to the framework */
    bind(modelPath, state, opts) {
        //If silent, create and set the model but avoid operations that notify the framework of changes
        opts = { ...opts, silent: false };
        if (state == null)
            state = {};
        const lastPropertyIndex = modelPath?.lastIndexOf(".");
        if (lastPropertyIndex > -1) {
            //If we're doing a nested bind, just do a set where possible
            const parent = this.model(modelPath.substring(0, lastPropertyIndex));
            if (parent == null)
                throw Error("invalid model path. Parent doesn't exist");
            const source = opts.silent ? this.state(parent) : parent;
            source[modelPath.substring(lastPropertyIndex + 1)] = state;
            return;
        }
        if (modelPath == null || modelPath === "")
            throw Error("invalid model name");
        if (!modelPath.match(`^${this.#validIdentifier}$`))
            throw Error("invalid model name");
        //TODO: check to make sure the name is a proper identifier
        const existed = this.#models[modelPath] != undefined;
        if (existed && !opts.silent)
            this.unbind(modelPath);
        let proxy = this.#makeProxy(state, modelPath, undefined);
        this.#models[modelPath] = proxy;
        if (!opts.silent)
            this.dispatch(this.#root, existed ? "set" : "bind", modelPath, undefined);
        return proxy;
    }
    get #validIdentifier() {
        return '[$a-zA-Z_][0-9a-zA-Z_$]*';
    }
    //Outputs the tag of the element
    elementTag(element) {
        return element.innerHTML ? element.outerHTML.substring(0, element.outerHTML.lastIndexOf(element.innerHTML)) : element.outerHTML;
    }
    refresh(model) {
        let modelPath;
        if (typeof model === "string") {
            modelPath = model;
            model = this.model(model);
        }
        else {
            modelPath = this.path(model);
        }
        if (model == undefined || !(model instanceof Object))
            return undefined;
        let promise = this.dispatch(this.#root, "bind", modelPath, undefined);
    }
    /** Unbinds the model from the framework related to the search. Search can be a string (name of model) or the state of the model */
    unbind(search) {
        let model = typeof search === "string"
            ? this.model(search)
            : search;
        if (model == undefined)
            return; //Promise.reject("model not found");
        let baseName = this.name(this.base(model));
        if (baseName == undefined)
            return; // Promise.reject("model not found");
        this.dispatch(this.#root, "unbind", baseName, undefined);
        delete this.#models[baseName];
        //return await promise;
    }
    subscribe(modelPath, callback, options) {
        if (typeof modelPath !== "string")
            modelPath = this.name(modelPath);
        const mockEvent = this.#createEvent(this.#root, "bind", this.#determineEventDetailProperties(modelPath, "property"), null, null);
        const subscription = new HydrateModelSubscription(this, modelPath, this.#subscriptionCallback(modelPath, callback, options), mockEvent);
        subscription.subscribe();
        return subscription;
    }
    ;
    #subscriptionCallback(modelPath, callback, options) {
        if (callback == null)
            return;
        const conditionArgs = options?.condition != null
            ? [{
                    field: "*",
                    expression: options.condition
                }]
            : null;
        const filterArgs = options?.filters != null
            ? [{
                    field: "*",
                    expression: options.filters.join(", ")
                }]
            : null;
        const nestedArgs = options?.nested != null
            ? [{
                    field: "*",
                    expression: options.nested.join(", ")
                }]
            : null;
        return (event) => {
            const detail = event.detail;
            if (detail.element !== this.#root)
                return;
            const changePath = detail.propPath ?? detail.modelPath;
            //We know that this change was for this property or at least a parent property
            if (!this.#checkIfModelChangeApplies(modelPath, changePath, detail, nestedArgs))
                return;
            const model = this.model(modelPath);
            const state = this.state(modelPath);
            if (state === undefined && modelPath.startsWith(changePath)
                && (detail.type === 'bind' || detail.type === "set"))
                //If the parent model changed and didn't bind/set us, then no change occured
                //Or if parent model changed and we don't exist, then we'll get a changed event
                return;
            if (!this.#passedFilterCheck(detail, modelPath, filterArgs))
                return;
            if (!this.#passedIfCheck(detail, conditionArgs))
                return;
            callback({
                event: event,
                model: model,
                state: state
            });
        };
    }
    #makeProxy(data, path, parent) {
        const nameIndex = path.lastIndexOf(".");
        const name = nameIndex < 0 ? path : path.substring(nameIndex + 1);
        const app = this;
        const baseName = parent == null ? path : parent.split(".")[0];
        let models = {};
        let proxy;
        let bindOrGet = function (obj, prop, parentName) {
            if (obj[prop] instanceof Date || !(obj[prop] instanceof Object))
                return null;
            let propName = (typeof prop === 'symbol') ? prop.toString() : prop;
            let modelName = path + "." + propName;
            let model = models[prop];
            if (model !== undefined)
                return model;
            else {
                //Make proxy
                models[prop] = app.#makeProxy(obj[prop], modelName, parentName);
                return models[prop];
            }
        };
        proxy = new Proxy(data, {
            get(obj, prop) {
                if (prop === app.#options.model.stateProperty)
                    return obj;
                if (prop === app.#options.model.nameProperty)
                    return name;
                if (prop === app.#options.model.pathProperty)
                    return path;
                if (prop === app.#options.model.parentProperty)
                    return app.model(parent);
                if (prop === app.#options.model.baseProperty)
                    return app.model(baseName);
                if (prop === 'toJson') {
                    if (typeof obj.toJson === 'function')
                        return obj.toJson;
                    else
                        return function () { return JSON.stringify(this); };
                }
                if (obj[prop] instanceof Object && obj[prop] != null) {
                    let model = bindOrGet(obj, prop, path);
                    //let model = null;
                    return model ? model : obj[prop];
                }
                else
                    return obj[prop];
            },
            set: function (obj, prop, value) {
                const oldValue = obj[prop];
                obj[prop] = value;
                models = {};
                //Don't allow DOM update to trigger if value is up-to-date or this model is no longer bound
                if (app.model(path) !== proxy) {
                    return true;
                }
                // if(!obj.propertyIsEnumerable(prop))
                //     return;
                let propName = (typeof prop === 'symbol') ? prop.toString() : prop;
                //app.dispatch("set", proxy, propName, previousValue, app.root, "all");
                if (oldValue != null && typeof oldValue === "object") {
                    const newIsObject = value != null && typeof value === "object";
                    for (let key of Object.keys(oldValue))
                        if (!newIsObject || !value.hasOwnProperty(key))
                            app.dispatch(app.#root, "unbind", path + "." + propName + "." + key, undefined);
                }
                app.dispatch(app.#root, "set", path + "." + propName, undefined);
                return true;
            },
            deleteProperty: function (obj, prop) {
                if (prop in obj) {
                    delete obj[prop];
                    if (models[prop] != undefined)
                        delete models[prop];
                    let propName = (typeof prop === 'symbol') ? prop.toString() : prop;
                    //app.dispatch("unbind", proxy, propName, property, app.root, "all");
                    app.dispatch(app.#root, "unbind", path + "." + propName, undefined);
                }
                return true;
            }
        });
        return proxy;
    }
    //Ayyyy, finish this later to start parsing the mutation event and allow it to filter out
    //syntax: h-mutation="" | h-mutation="" responds to all mutations
    //  h-mutation="target: *" responds to all mutation.target events
    //  h-mutation="target: characterdata; child: added, removed;" responds to all target characterdata events, and all child added and removed events
    #parseElementMutationEvents(element) {
        let mutationAttribute = this.attribute(this.#options.attribute.names.mutation);
        let map = new Map();
        if (!element.hasAttribute(mutationAttribute))
            return map;
        let args = this.parseAttributeArguments(element, mutationAttribute);
        const wildcard = "*";
        map.set("mutation.target.added", false);
        map.set("mutation.target.removed", false);
        map.set("mutation.target.attribute", false);
        map.set("mutation.target.characterdata", false);
        map.set("mutation.parent.added", false);
        map.set("mutation.parent.removed", false);
        map.set("mutation.parent.attribute", false);
        map.set("mutation.parent.characterdata", false);
        map.set("mutation.child.added", false);
        map.set("mutation.child.removed", false);
        map.set("mutation.child.attribute", false);
        map.set("mutation.child.characterdata", false);
        if (args.length === 1 && args[0].field === ""
            && (args[0].expression.trim() === wildcard || args[0].expression.trim() === "")) {
            for (let key of map.keys())
                map.set(key, true);
            return map;
        }
        for (let arg of args) {
            let value = arg.expression.trim();
            //If wildcard or empty, allow all
            if ((value === wildcard || value === "")) {
                //If we are only an attribute value="*" || "", let all of the mutations through
                if (arg.field === "" && args.length === 1) {
                    for (let key of map.keys())
                        map.set(key, true);
                    return map;
                }
                for (let key of map.keys()) {
                    if (key.startsWith(`mutation.${arg.field}`))
                        map.set(key, true);
                }
            }
            else {
                var types = arg.expression.match(/([a-zA-Z]+)/g);
                if (types === null)
                    continue;
                for (let t = 0; t < types.length; t++) {
                    let key = `mutation.${arg.field}.${types[t]}`;
                    let value = map.get(key);
                    if (value == null)
                        continue;
                    map.set(key, true);
                }
            }
        }
        return map;
    }
    #mutationCallback(mutations, observer) {
        this.#trackableElementSelector;
        const trackableSelector = this.#trackableElementSelector;
        const lazyElementSelector = this.#lazyLoadElementSelector;
        const componentsSelector = this.#availabeComponentSelector;
        const bindScriptModelSelector = this.#bindScriptModelSelector;
        let modelAttribute = this.attribute(this.#options.attribute.names.model);
        const componentTemplateSelector = this.#componentTemplateSelector;
        const templateAttribute = this.attribute(this.#options.attribute.names.template);
        const sourceAttribute = this.attribute(this.#options.attribute.names.source);
        const trackElementQueue = new Set();
        const bindScriptModelQueue = new Set();
        mutations.forEach(mutation => {
            if (!mutation.target.isConnected)
                return;
            const target = mutation.target;
            switch (mutation.type) {
                case "attributes":
                    {
                        if (!(mutation.target instanceof HTMLElement))
                            return;
                        if (mutation.target.getAttribute(mutation.attributeName) === mutation.oldValue)
                            return;
                        if (this.#options.attribute.trackables.indexOf(mutation.attributeName) >= 0) {
                            let element = mutation.target;
                            if (element.matches(lazyElementSelector))
                                this.#trackLazyElement(element);
                            else
                                this.#untrackLazyElement(element);
                            if (element.matches(componentsSelector))
                                this.#linkComponent(element);
                            if ((mutation.attributeName === templateAttribute || mutation.attributeName === sourceAttribute)
                                && element.matches(componentTemplateSelector))
                                this.#loadTemplate(element, true);
                            if (mutation.target.matches(trackableSelector)) {
                                trackElementQueue.add(element);
                                // let newTrack = this.#trackElement(element);
                                // if(newTrack === false) {
                                //     //Wasn't a new track, but a core value changed, so rebind the element
                                //     let modelName = element.getAttribute(modelAttribute);
                                //     this.dispatch(element, "bind", modelName, undefined);
                                // }
                            }
                            else {
                                trackElementQueue.delete(mutation.target);
                                this.#untrackElement(mutation.target);
                                this.#unlinkComponent(mutation.target);
                            }
                            if (mutation.target.matches(bindScriptModelSelector))
                                bindScriptModelQueue.add(element);
                        }
                        this.dispatch(mutation.target, "mutation.parent.attribute", undefined, mutation);
                        this.dispatch(mutation.target, "mutation.target.attribute", undefined, mutation);
                        this.dispatch(mutation.target, "mutation.child.attribute", undefined, mutation);
                        break;
                    }
                case "childList":
                    {
                        let addedElement = false;
                        mutation.addedNodes.forEach(node => {
                            if (!node.isConnected)
                                return;
                            if (!(node instanceof HTMLElement) || node.parentNode == null)
                                return;
                            addedElement = true;
                            if (node.matches(componentsSelector)) {
                                this.#trackLazyElement(node);
                                this.#linkComponent(node);
                            }
                            //this.#trackElement(node);
                            trackElementQueue.add(node);
                            let elements = node.querySelectorAll(trackableSelector);
                            if (node.matches(componentTemplateSelector))
                                this.#loadTemplate(node, true);
                            for (let element of node.querySelectorAll(componentTemplateSelector))
                                this.#loadTemplate(element, true);
                            for (let element of node.querySelectorAll(lazyElementSelector))
                                this.#trackLazyElement(element);
                            for (let element of node.querySelectorAll(componentsSelector)) {
                                this.#trackLazyElement(element);
                                this.#linkComponent(element);
                            }
                            for (let element of elements) {
                                //this.#trackElement(element);
                                trackElementQueue.add(element);
                                if (element.matches(componentTemplateSelector))
                                    this.#loadTemplate(element, true);
                            }
                            if (node.matches(bindScriptModelSelector))
                                bindScriptModelQueue.add(node);
                            for (let element of node.querySelectorAll(bindScriptModelSelector))
                                bindScriptModelQueue.add(element);
                        });
                        if (addedElement && mutation.target instanceof HTMLElement) {
                            this.dispatch(mutation.target, "mutation.parent.added", undefined, mutation);
                            this.dispatch(mutation.target, "mutation.target.added", undefined, mutation);
                            this.dispatch(mutation.target, "mutation.child.added", undefined, mutation);
                        }
                        let removedElement = false;
                        for (let node of mutation.removedNodes) {
                            if (node.isConnected)
                                return;
                            if (!(node instanceof HTMLElement))
                                return;
                            removedElement = true;
                            this.#untrackLazyElement(node);
                            trackElementQueue.delete(node);
                            this.#untrackElement(node);
                            this.#unlinkComponent(node);
                            let elements = node.querySelectorAll(trackableSelector);
                            for (let element of node.querySelectorAll(lazyElementSelector))
                                this.#untrackLazyElement(element);
                            for (let element of elements) {
                                this.#untrackLazyElement(element);
                                trackElementQueue.delete(element);
                                this.#untrackElement(element);
                                this.#unlinkComponent(element);
                            }
                        }
                        if (removedElement && mutation.target instanceof HTMLElement) {
                            this.dispatch(mutation.target, "mutation.parent.removed", undefined, mutation);
                            this.dispatch(mutation.target, "mutation.target.removed", undefined, mutation);
                            this.dispatch(mutation.target, "mutation.child.removed", undefined, mutation);
                        }
                        break;
                    }
                case "characterData":
                    {
                        if (mutation.target instanceof HTMLElement) {
                            this.dispatch(mutation.target, "mutation.parent.characterdata", undefined, mutation);
                            this.dispatch(mutation.target, "mutation.target.characterdata", undefined, mutation);
                            this.dispatch(mutation.target, "mutation.child.characterdata", undefined, mutation);
                        }
                        break;
                    }
            }
        });
        for (let element of trackElementQueue) {
            let newTrack = this.#trackElement(element);
            if (newTrack === false) {
                //Wasn't a new track, but a core value changed, so rebind the element
                let modelName = element.getAttribute(modelAttribute);
                this.dispatch(element, "bind", modelName, undefined);
            }
        }
        for (let element of bindScriptModelQueue) {
            this.#bindScriptModel(element);
        }
    }
    #intersectionCallback(entries) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                const element = entry.target;
                this.#intersectionObserver.unobserve(element);
                element.removeAttribute(this.attribute(this.#options.attribute.names.lazy));
            }
        }
    }
    #trackLazyElements() {
        for (let element of this.#root.querySelectorAll(this.#lazyLoadElementSelector))
            this.#intersectionObserver.observe(element);
    }
    #trackLazyElement(element) {
        if (element.matches(this.#lazyLoadElementSelector))
            this.#intersectionObserver.observe(element);
    }
    #untrackLazyElement(element) {
        this.#intersectionObserver.unobserve(element);
    }
    get #lazyLoadElementSelector() {
        return `:not(template)[${this.attribute(this.#options.attribute.names.lazy)}]`;
    }
    #inputListener(event) {
        let target = event.target;
        if (!target.matches(this.#trackableElementSelector))
            return;
        // let modelName = target.getAttribute(this.attribute(this.#options.attribute.names.model));
        // let model = this.model(modelName);
        // let state = this.state(modelName);
        // if(!(state instanceof Object))
        //     return;
        this.dispatch(target, "input", null, event);
    }
    #addTrackableAttributes() {
        this.#options.attribute.trackables.push(this.attribute(this.#options.attribute.names.property), this.attribute(this.#options.attribute.names.model), this.attribute(this.#options.attribute.names.init), this.attribute(this.#options.attribute.names.component), this.attribute(this.#options.attribute.names.attribute), this.attribute(this.#options.attribute.names.property), this.attribute(this.#options.attribute.names.toggle), this.attribute(this.#options.attribute.names.class), this.attribute(this.#options.attribute.names.remove), this.attribute(this.#options.attribute.names.input), this.attribute(this.#options.attribute.names.mutation), this.attribute(this.#options.attribute.names.lazy), this.attribute(this.#options.attribute.names.mock), this.attribute(this.#options.attribute.names.if), this.attribute(this.#options.attribute.names.event), this.attribute(this.#options.attribute.names.on), this.attribute(this.#options.attribute.names.shadow), this.attribute(this.#options.attribute.names.duplicate), this.attribute(this.#options.attribute.names.route), this.attribute(this.#options.attribute.names.routing), this.attribute(this.#options.attribute.names.mutation), this.attribute(this.#options.attribute.names.source));
        let app = this;
        //this.#options.attribute.trackables.push(...this.#options.attribute.names.customs.map(x => app.attribute(x)));
    }
    #addStandardAttributeHandlers() {
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.init), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model != null)
                return;
            //If already initialized, then don't do anything
            if (eventDetails.state != null)
                return;
            let state = this.state(eventDetails.baseName);
            let startPath = null;
            if (state == null) {
                state = {};
                startPath = eventDetails.baseName;
            }
            //this.bind(eventDetails.baseName, {});
            const nameParts = eventDetails.modelPath.split(".");
            let data = state;
            for (let i = 1; i < nameParts.length; i++) {
                const name = nameParts[i];
                if (data[name] == null) {
                    data[name] = {};
                    if (startPath == null) {
                        startPath = nameParts.slice(0, i + 1).join(".");
                        state = data[name];
                    }
                }
                data = data[name];
            }
            this.bind(startPath, state);
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.property), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model === undefined)
                return;
            let value = eventDetails.hydrate.resolveArgumentValue(eventDetails, arg, null);
            if (value === undefined)
                return;
            if (eventDetails.element[arg.field] === value)
                return;
            eventDetails.element[arg.field] = value;
            return;
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.attribute), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model === undefined)
                return;
            let value = eventDetails.hydrate.resolveArgumentValue(eventDetails, arg, null);
            if (value === undefined)
                return;
            if (eventDetails.element.getAttribute(arg.field) === value)
                return;
            eventDetails.element.setAttribute(arg.field, value);
            return;
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.class), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model === undefined)
                return;
            let value = eventDetails.hydrate.resolveArgumentValue(eventDetails, arg, null);
            eventDetails.element.classList.toggle(arg.field, value);
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.toggle), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model === undefined)
                return;
            let value = eventDetails.hydrate.resolveArgumentValue(eventDetails, arg, null);
            eventDetails.element.toggleAttribute(arg.field, value);
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.remove), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model === undefined
                && eventDetails.propPath !== null && eventDetails.type !== 'unbind')
                return;
            eventDetails.element.remove();
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.event), (arg, eventDetails) => {
            if (arg.field !== "*" && arg.field !== eventDetails.type)
                return;
            if (this.#isRoutingEvent(eventDetails.type)) {
                var routeRequest = eventDetails?.request;
                if (this.#elementIsHandledByRoute(eventDetails.element, eventDetails.type, routeRequest) !== "handled")
                    return;
            }
            eventDetails.hydrate.resolveArgumentValue(eventDetails, arg, null);
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.input), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model === undefined
                && eventDetails.propPath !== undefined && eventDetails.type !== 'unbind')
                return;
            let value = this.resolveArgumentValue(eventDetails, arg, eventDetails.event);
            if (arg.field.trim() !== "" && arg.field !== "*") {
                if (eventDetails.state[arg.field] === value)
                    return;
                eventDetails.model[arg.field] = value;
            }
            else {
                if (eventDetails.state === value)
                    return;
                eventDetails.model = value;
            }
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.on), (arg, eventDetails) => {
            if (arg.field !== eventDetails.event.type)
                return;
            eventDetails.hydrate.resolveArgumentValue(eventDetails, arg, eventDetails.event);
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.component), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model === undefined)
                return;
            const component = this.#components.get(eventDetails.element);
            //If we are not linked to a component, the event isn't targeting the model (and not targeting a property) unless it's the array.length property
            if (component == null
                || (eventDetails.propName !== undefined && !Array.isArray(eventDetails.state) && eventDetails.propName !== "length"))
                return;
            //Caching the number of components we generated as we should need to regen unless that number has changed
            var dataLength = eventDetails.state?.length ?? -1; //Non arrays will have a size of -1 since an array can have length 0
            const matchedState = component.prevSize === dataLength;
            component.prevSize = dataLength;
            //If the model bound to this element is not an object, don't regenerate because the value is constant
            if (eventDetails.type === "set") {
                if (!(eventDetails.model instanceof Object) || matchedState)
                    return;
            }
            let hasRoutintAttribute = eventDetails.element.hasAttribute(this.attribute(this.#options.attribute.names.routing));
            if (hasRoutintAttribute) {
                var routeRequest = eventDetails?.request;
                switch (this.#elementIsHandledByRoute(eventDetails.element, eventDetails.type, routeRequest)) {
                    case "unhandled": {
                        let element = eventDetails.element;
                        while (element.firstChild)
                            element.removeChild(element.firstChild);
                        if (element.shadowRoot) {
                            let shadow = element.shadowRoot;
                            while (shadow.firstChild)
                                shadow.removeChild(shadow.firstChild);
                        }
                        return;
                    }
                    case "unchanged":
                        return;
                    case "handled":
                        break;
                }
            }
            else if (this.#isRoutingEvent(eventDetails.type))
                return;
            this.#buildComponent(component, eventDetails);
        });
        this.#options.attribute.handlers.set(this.attribute(this.#options.attribute.names.mock), (arg, eventDetails) => {
            if (eventDetails.modelName !== "" && eventDetails.model === undefined)
                return;
            const modelPath = eventDetails.modelPath;
            const element = eventDetails.element;
            const args = this.parseAttributeArguments(element, this.attribute(this.#options.attribute.names.mock));
            const mockedAttributes = new Map();
            for (let attribute of args)
                mockedAttributes.set(attribute.field, this.resolveArgumentValue(eventDetails, attribute, null));
            //The mocking attribute means we need to reset all of our handlers
            //So clear out all the old executers
            //Manually add back this handler so we can update things the next time changes happen
            //Manually add all the other handlers
            this.#clearElementExecuters(element);
            this.#addElementExecuters(element, modelPath, mockedAttributes);
            const executers = this.#getExcecuters(eventDetails.type, [element])?.get(element);
            if (executers) {
                for (let path of executers.keys())
                    this.dispatch(eventDetails.element, eventDetails.type, path, null);
            }
            this.#addMockAttributeHandler(element, modelPath);
            return;
        });
    }
    #determineMockedAttributes(element, modelPath) {
        //Reads the mocked attribute and determines the actual model paths the following attributes should respond to
        const args = this.parseAttributeArguments(element, this.attribute(this.#options.attribute.names.mock));
        const mockedAttributes = new Map();
        let mockEvent = this.#createEvent(element, "bind", this.#determineEventDetailProperties(modelPath, "model"), null, null);
        for (let arg of args)
            mockedAttributes.set(arg.field, this.resolveArgumentValue(mockEvent.detail, arg, null));
        return mockedAttributes;
    }
    #isRoutingEvent(eventType) {
        switch (eventType) {
            case "routing.start":
            case "routing.resolve":
            case "routing.reject":
                return true;
            default:
                return false;
        }
    }
    #elementIsHandledByRoute(element, eventType, routeRequest) {
        let routeAttribute = this.attribute(this.#options.attribute.names.route);
        let routingAttribute = this.attribute(this.#options.attribute.names.routing);
        let routing = element.getAttribute(routingAttribute);
        let routerElement = element;
        let route = routerElement.getAttribute(routeAttribute);
        if (route == null) {
            routerElement = element.parentElement;
            if (routerElement != null)
                route = routerElement.getAttribute(routeAttribute);
        }
        if (route == null) {
            return "unhandled";
        }
        let routeUrl = null;
        if (this.#isRoutingEvent(eventType))
            routeUrl = routeRequest.url;
        else {
            eventType = this.#routingState.eventType;
            routeUrl = this.#routingState.url;
            if (routeUrl == null) {
                return "unchanged";
            }
            routeRequest = new HydrateRouteRequest(this, new URL(routeUrl), {}, () => true, this.#routingState);
        }
        let routingType = eventType.substring(eventType.lastIndexOf(".") + 1);
        let selector = `[${routingAttribute}*=${routingType}]`;
        if (routeRequest.match(routeUrl, { path: route }) == null)
            return "unhandled";
        if (routerElement === element && routing == null)
            return "unchanged";
        let children = routerElement === element
            ? [element] : [...routerElement.children];
        for (let child of children) {
            if (child.matches(selector))
                return child === element ?
                    "handled" : "unhandled";
        }
        return "unchanged";
    }
    async #loadTemplates() {
        const templateAttribute = this.attribute(this.#options.attribute.names.template);
        const templateSelector = this.#componentTemplateSelector;
        const promises = [];
        for (let template of this.root.querySelectorAll(templateSelector))
            promises.push(this.#loadTemplate(template, true));
        await Promise.allSettled(promises);
    }
    async #loadTemplate(element, lazyLoad) {
        let typeName = null;
        try {
            const lazyAttribute = this.attribute(this.#options.attribute.names.lazy);
            if (!element.matches(this.#componentTemplateSelector))
                return null;
            let lazy = lazyLoad && element.hasAttribute(lazyAttribute);
            if (lazy)
                return;
            typeName = element.getAttribute(this.attribute(this.#options.attribute.names.template))?.toLowerCase();
            if (!typeName)
                return;
            if (this.#componentTypes.has(typeName)) {
                console.error(`A template with the name ${typeName} has already been declared`);
                return;
            }
            //Tell the framework we are in the process of loading
            const type = {
                loaded: false,
                attributes: null,
                template: null,
                classDefinition: null,
                style: null
            };
            this.#componentTypes.set(typeName, type);
            const sourceAttribute = this.attribute(this.#options.attribute.names.source);
            const url = element.getAttribute(sourceAttribute);
            if (url != null) {
                const source = await this.#loadRemoteTemplate(url);
                await this.#fillTemplate(typeName, element, lazy, source.template, source.componentBody);
                return;
            }
            await this.#fillTemplate(typeName, element, lazy, null, null);
        }
        catch (error) {
            //If we failed trying to load, then delete the record so something else can try to load
            this.#componentTypes.delete(typeName);
            console.error(error);
        }
    }
    async #fillTemplate(typeName, element, lazy, sourceTemplate, componentBody) {
        const lazyAttribute = this.attribute(this.#options.attribute.names.lazy);
        const templateAttribute = this.attribute(this.#options.attribute.names.template);
        const componentAttribute = this.attribute(this.#options.attribute.names.component);
        const scriptAttribute = this.attribute(this.#options.attribute.names.script);
        const scriptSelector = `script[${scriptAttribute}]`;
        const modelAttribute = this.attribute(this.#options.attribute.names.model);
        const shadowAttribute = this.attribute(this.#options.attribute.names.shadow);
        const bindScriptModelSelector = this.#bindScriptModelSelector;
        const componentSelector = `${typeName}:not([${lazyAttribute}]),[${componentAttribute}='${typeName}' i]:not([${lazyAttribute}])`;
        const components = this.#root.querySelectorAll(componentSelector);
        if (lazy && components.length === 0)
            //If we are lazy loading and don't have any non-lazy components to load, then don't load this template
            return;
        const type = {
            loaded: true,
            attributes: new Map(),
            template: [],
            classDefinition: componentBody ?? HydrateComponent,
            style: null
        };
        this.#componentTypes.set(typeName, type);
        if (sourceTemplate !== null) {
            //Load up the attributes
            for (let attribute of sourceTemplate.attributes)
                if (attribute.name !== templateAttribute)
                    type.attributes.set(attribute.name, attribute.value);
        }
        for (let attribute of element.attributes)
            if (attribute.name !== templateAttribute)
                type.attributes.set(attribute.name, attribute.value);
        type.attributes.set(this.attribute(this.#options.attribute.names.component), typeName);
        //Remove the lazy attribute to not copy over to component
        //type.attributes.delete(this.attribute(this.#options.attribute.names.lazy));
        //Set to modeless component by default if no model was specified
        if (!type.attributes.has(modelAttribute))
            type.attributes.set(modelAttribute, "");
        const template = sourceTemplate ?? element.cloneNode(true);
        const scripts = template.content.querySelectorAll("script");
        for (let script of scripts) {
            //Look for a class definition script and load it if we find it
            if (componentBody == null && script.matches(scriptSelector))
                type.classDefinition = await this.#loadStringModule(script.textContent);
            if (!script.matches(bindScriptModelSelector))
                //Remove any script elements from the component to prevent malicious scripts unless it's an attempt to load a model
                script.remove();
        }
        const styleAttribute = this.attribute(this.#options.attribute.names.style);
        const styleSelector = `style[${styleAttribute}]`;
        const styles = template.content.querySelectorAll(styleSelector);
        for (let style of styles) {
            type.style = this.#buildCssStyle(style, typeName);
            style.remove();
        }
        //Don't load the template if it's just white space so we know whether to clear the dom or not
        if (!template.innerHTML.match(/^\s*$/))
            type.template.push(...template.content.childNodes);
        //If we had a source template, apply the changes to our root template element
        if (sourceTemplate) {
            for (let [attrName, attrValue] of type.attributes)
                element.setAttribute(attrName, attrValue);
            element.content.append(...sourceTemplate.content.childNodes);
        }
        //Link all components of this type
        for (let element of components)
            this.#linkComponent(element);
    }
    async #loadStringModule(text) {
        const lines = text.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
            const match = lines[i].match(/\s*import.*([\"\'\`].*[\"\'\`])/);
            if (!match)
                continue;
            const module = match[1].substring(1, match[1].length - 1);
            //If we have a relative file path, we need to manually fix it since the Obj URL won't know the current URL
            lines[i] = lines[i].replace(module, `${decodeURI(new URL(module, location.href).href)}`);
        }
        const script = lines.join("\n");
        // const module =  (await import(`data:text/javascript,${script}`))
        // return module.default ??  Object.values(module)[0] as HydrateComponentConstructor;
        const blob = new Blob([script], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const module = await import(url);
        URL.revokeObjectURL(url);
        return module.default ?? Object.values(module)[0];
    }
    #buildCssStyle(baseStyle, componentTypeName) {
        const modelAttribute = this.attribute(this.#options.attribute.names.model);
        const componentAttribute = this.attribute(this.#options.attribute.names.component);
        const componentSelector = `[${modelAttribute}][${componentAttribute}='${componentTypeName}' i]`;
        const style = document.createElement("style");
        let styleText = baseStyle.textContent;
        let leadingWhitespace = undefined; // = styleText.match(/^[\r\n]*(\s*)[^\s]/);
        let regex;
        const lines = styleText.split(/[\r\n]/);
        for (let i = 0; i < lines.length; i++) {
            if (leadingWhitespace === undefined && lines[i].trim() !== "") {
                leadingWhitespace = lines[i].match(/^\s+/)?.[0] ?? null;
                if (leadingWhitespace)
                    regex = new RegExp(`^${leadingWhitespace}`);
            }
            if (leadingWhitespace)
                lines[i] = lines[i].replace(regex, "");
        }
        style.textContent = lines.join("\n").replace(/:root/g, componentSelector);
        return style;
    }
    async #loadRemoteTemplate(url) {
        const promises = [];
        const htmlExt = url.lastIndexOf(".html");
        const selfContained = htmlExt > -1;
        if (selfContained)
            promises.push(fetch(url), Promise.resolve(null), Promise.resolve(null));
        else
            promises.push(fetch(`${url}/index.html`), fetch(`${url}/index.css`), fetch(`${url}/index.js`));
        //[fetch(`${url}.html`), fetch(`${url}.css`), fetch(`${url}.js`)]
        return await Promise.allSettled(promises)
            .then(([html, css, js]) => {
            if (html.status === "rejected")
                throw new Error(`Unknown error fetching html for template ${url}. ${html.reason}`);
            if (html.value?.ok === false && html.value?.status !== 404)
                throw new Error(`${html.value?.status}: Error fetching html for template ${url}`);
            if (css.status === "rejected")
                throw new Error(`Unknown error fetching css for template ${url}. ${css.reason}`);
            //It's ok if we don't find this
            if (css.value?.ok === false && css.value?.status !== 404)
                throw new Error(`${css.value?.status}: Error fetching css for template ${url}`);
            if (js.status === "rejected")
                throw new Error(`Unknown error fetching js for template ${url}. ${js.reason}`);
            //It's ok if we dont find this
            if (js.value?.ok === false && js.value?.status !== 404)
                throw new Error(`${js.value?.status}: Error fetching js for template ${url}`);
            return Promise.all([
                html.value?.ok === true ? html.value.text() : Promise.resolve(null),
                css.value?.ok === true ? css.value.text() : Promise.resolve(null),
                js.value?.ok === true ? import(js.value.url) : Promise.resolve(null)
            ]);
        })
            .then(([html, css, js]) => {
            const lazyAttribute = this.attribute(this.#options.attribute.names.lazy);
            let div = document.createElement("div");
            div.innerHTML = html;
            let template = div.querySelector("template");
            if (!template) {
                template = document.createElement("template");
                //div.append(template);
            }
            if (css !== null) {
                const style = document.createElement("style");
                style.toggleAttribute(this.attribute(this.#options.attribute.names.style), true);
                style.innerHTML = css;
                template.content.append(style);
            }
            //If we imported a js module, assume the first export is the component body
            const componentBody = js !== null
                ? js.default ?? Object.values(js)[0]
                : null;
            // if(js !== null && js.trim() !== "")s
            // {
            //     const script = document.createElement("script");
            //     script.toggleAttribute(this.attribute(this.#options.attribute.names.script), true);
            //     script.innerHTML = js;
            //     template.content.append(script);
            // }
            //Load up the HTML
            // element.content.append(...template.content.childNodes);
            // //Load up the attributes
            // for(let attribute of template.attributes)
            //     if(!element.hasAttribute(attribute.name) && attribute.name !== lazyAttribute)
            //         element.setAttribute(attribute.name, attribute.value);
            // //This should guarentee a reload of the component
            // element.removeAttribute(lazyAttribute);
            // element.removeAttribute(this.attribute(this.#options.attribute.names.source));
            return {
                template: template,
                componentBody: componentBody
            };
        });
    }
    get lazy() {
        return this.#lazyElements;
    }
    get #availabeComponentSelector() {
        const templateAttribute = this.attribute(this.#options.attribute.names.template);
        const componentAttribute = this.attribute(this.#options.attribute.names.component);
        const templates = this.#root.querySelectorAll(`template[${templateAttribute}]`);
        const templateNames = new Set();
        //Load all the names
        for (let template of templates) {
            const name = template.getAttribute(templateAttribute);
            if (!name)
                continue;
            templateNames.add(name);
        }
        for (let name of this.#componentTypes.keys())
            templateNames.add(name);
        if (templateNames.size === 0)
            return `[${componentAttribute}]`;
        let elementSelecor = "";
        for (let selector of templateNames)
            elementSelecor += `,${selector},[${componentAttribute}=${selector}]`;
        return elementSelecor.substring(1);
    }
    #linkComponent(element) {
        //Don't load if we're lazy && not trying to load
        if (element.matches(this.#lazyLoadElementSelector))
            return;
        try {
            const componentAttribute = this.attribute(this.#options.attribute.names.component);
            const componentTypeName = element.getAttribute(componentAttribute)?.toLowerCase() ?? element.tagName.toLowerCase();
            let componentType = this.#componentTypes.get(componentTypeName);
            if (componentType == null) {
                const templateAttribute = this.attribute(this.#options.attribute.names.template);
                const templateSelector = `template[${templateAttribute}=${componentTypeName}]`;
                const template = this.root.querySelector(templateSelector);
                if (template)
                    this.#loadTemplate(template, false);
                return;
            }
            //Wait until the template has finished loading
            if (componentType.loaded === false)
                return;
            let component = this.#components.get(element);
            if (component?.type == componentType)
                return;
            const hydrate = this;
            component = {
                initialized: false,
                element,
                type: componentType,
                data: new componentType.classDefinition({ hydrate, element }),
                mutationObserver: null,
                prevSize: undefined
            };
            //Add some default behavior to the component class
            // Object.defineProperty(component.data, '$hydrate', {
            //     get() {
            //         return hydrate;
            //     }
            // });
            // component.data.$dependency = function<T>(definition:new (...args) => T): T {
            //     return hydrate.dependency(definition, element).instance;
            // };
            // Object.defineProperty(component.data, '$root', {
            //     get() {
            //         return component.element;
            //     }
            // });
            // Object.defineProperty(component.data, '$modelPath', {
            //     get() {
            //         return component.element.getAttribute(this.$hydrate.attribute(this.$hydrate.options.attribute.names.model));
            //     }
            // });
            // Object.defineProperty(component.data, '$model', {
            //     get() {
            //         return this.$hydrate.model(this.$modelPath);
            //     },
            //     set(value) {
            //         this.$hydrate.bind(this.$modelPath, value);
            //     }
            // });
            // Object.defineProperty(component.data, '$state', {
            //     get() {
            //         return this.$hydrate.state(this.$modelPath);
            //     }
            // });
            this.#components.set(element, component);
            //remove from lazy load queue
            this.#lazyElements.delete(element);
            //Copy component attributes over from template
            for (let attribute of componentType.attributes.keys())
                if (!element.hasAttribute(attribute))
                    element.setAttribute(attribute, componentType.attributes.get(attribute));
        }
        catch (error) {
            console.error(error);
        }
    }
    #unlinkComponent(element) {
        let component = this.#components.get(element);
        if (component == null)
            return;
        //Call component unitializer callback if available
        if (component.initialized)
            component.data.onDestroy();
        for (let configuration of this.#dependencies.values()) {
            const dependency = configuration.instances.get(element);
            if (dependency != null)
                dependency.dispose();
        }
        this.#components.delete(element);
        if (component.mutationObserver)
            this.#mutationObserver.disconnect();
    }
    #buildComponent(component, eventDetails) {
        //Call component initializer callback if available
        if (component.initialized === false) {
            component.data.onInit(eventDetails);
            component.initialized = true;
        }
        //Call component change callback if available
        component.data.onPreRender(eventDetails);
        let element = eventDetails.element;
        const modelAttribute = this.attribute(this.#options.attribute.names.model);
        let modelSelector = `[${modelAttribute}^=\\^]`;
        const scaffoldAttribute = this.attribute(this.#options.attribute.names.scaffold);
        const scaffoldSelector = `[${scaffoldAttribute}]`;
        const insertModelPath = function (element, path) {
            element.setAttribute(modelAttribute, element.getAttribute(modelAttribute).replace("^", path));
        };
        let id = 0;
        const idAttribute = this.attribute(this.#options.attribute.names.id);
        const idSelector = `[${idAttribute}]`;
        const insertId = function (element) {
            element.setAttribute(idAttribute, (id++).toString());
        };
        let children = [];
        let modelPaths = Array.isArray(eventDetails.state)
            ? Object.keys(eventDetails.state).map(x => `${eventDetails.modelPath}.${x}`)
            : [eventDetails.modelPath];
        const duplicateAttribute = this.attribute(this.#options.attribute.names.duplicate);
        if (element.hasAttribute(duplicateAttribute)) {
            let arg = {
                field: "",
                expression: element.getAttribute(duplicateAttribute)
            };
            const loopCount = this.resolveArgumentValue(eventDetails, arg, null);
            modelPaths = [];
            for (let i = 0; i < loopCount; i++)
                modelPaths.push(eventDetails.modelPath);
        }
        if (component.type.style)
            children.push(component.type.style.cloneNode(true));
        for (let modelPath of modelPaths) {
            for (var child of component.type.template) {
                let node = child.cloneNode(true);
                children.push(node);
                if (!(node instanceof HTMLElement))
                    continue;
                //Inject model name and initialize component
                if (node.matches(modelSelector))
                    insertModelPath(node, modelPath);
                for (let element of node.querySelectorAll(modelSelector))
                    insertModelPath(element, modelPath);
                if (node.matches(idSelector))
                    insertId(node);
                for (let element of node.querySelectorAll(idSelector))
                    insertId(element);
                //If we have anything that needs scaffolding, go ahead and execute it
                let scaffoldedElements = (node.matches(scaffoldSelector) ? [node] : [])
                    .concat(...node.querySelectorAll(scaffoldSelector));
                for (let element of scaffoldedElements) {
                    const props = this.#determineEventDetailProperties(modelPath, "model");
                    const detail = new HydrateScaffoldEventDetails(this, element, "scaffold", props, eventDetails);
                    const arg = {
                        field: "",
                        expression: element.getAttribute(scaffoldAttribute)
                    };
                    this.resolveArgumentValue(detail, arg, null, { component: component });
                }
            }
        }
        const shadowAttribute = this.attribute(this.#options.attribute.names.shadow);
        const shadowDom = element.hasAttribute(shadowAttribute);
        if (shadowDom) {
            if (!element.shadowRoot)
                element.attachShadow({ mode: 'open' });
            if (!component.mutationObserver)
                component.mutationObserver = this.#observeDom(element.shadowRoot);
        }
        else if (component.mutationObserver) {
            component.mutationObserver.disconnect();
            component.mutationObserver = null;
        }
        const content = shadowDom ? element.shadowRoot : element;
        if (component.type.template.length > 0) {
            //Only clear/rerender the component if the template has a body
            //otherwise, keep the inner HTML of the component unaltered
            //delete the current content and shadow dom
            while (element.firstChild)
                element.removeChild(element.firstChild);
            if (element.shadowRoot) {
                let shadow = element.shadowRoot;
                while (shadow.firstChild)
                    shadow.removeChild(shadow.firstChild);
            }
            for (let node of children)
                content.appendChild(node);
        }
        else if (component.type.style) {
            const style = content.querySelector("style");
            if (style)
                style.textContent = component.type.style.textContent;
            else
                content.appendChild(component.type.style.cloneNode(true));
        }
        //Call component change callback if available
        component.data.onPostRender(eventDetails);
    }
    resolveArgumentValue(detail, arg, event, overrides = {}) {
        const app = this;
        const component = overrides?.component?.data ?? app.#findComponentForElement(detail.element)?.data;
        const functionArgs = {
            $hydrate: this,
            $element: detail.element,
            $detail: detail,
            $model: detail.model,
            $event: event,
            $state: detail.state,
            $parent: detail.parent,
            $modelName: detail.modelName,
            // $script: function(name) {
            //     let selector = `[${app.attribute(app.options.attribute.names.script)}=${name}]`;
            //     let scriptElement = app.root.querySelector(selector);
            //     if(scriptElement == null)
            //         return null;
            //     let func = new Function(`return ${scriptElement.textContent.trim()}`)();
            //     if(!(func instanceof Function))
            //         return null;
            //     return func;
            // },
            $id: function (query) {
                if (query == null)
                    query = detail.element;
                let element = (query instanceof HTMLElement)
                    ? query : app.#root.querySelector(query);
                const idAttribute = app.attribute(app.#options.attribute.names.id);
                return element.getAttribute(idAttribute);
            },
            $component: component
        };
        const validIndentifier = /^[$A-Z_][0-9A-Z_$]*$/i;
        var stateKeys = Object.keys(detail.state ?? {}).filter(x => x.match(validIndentifier));
        var keys = Object.keys(functionArgs).concat(stateKeys);
        var values = Object.values(functionArgs);
        if (typeof detail.state === "object")
            for (let key of stateKeys)
                //@ts-ignore
                values.push(detail.state[key]);
        let func;
        try {
            func = new Function(...keys, `return ${arg.expression}`);
            if (component != null)
                func = func.bind(component);
            return func(...values);
        }
        catch (error) {
            let message = func == null ? "Could not process field expression syntax"
                : `Failed to evaluate expression | ${arg.expression} |`;
            throw new Error(`Error on element ${this.elementTag(functionArgs.$element)}. \n${message} \n ${error.toString()}`);
        }
    }
    #findComponentForElement(element) {
        while (element != null) {
            let component = this.#components.get(element);
            if (component != null)
                return component;
            if (element instanceof ShadowRoot) {
                element = element.host;
                continue;
            }
            element = element.parentNode;
        }
        return null;
    }
    parseAttributeArguments(element, name) {
        if (!element.hasAttribute(name))
            return [];
        let expression = element.getAttribute(name).trim();
        let args = this.#parseAttributeValues(expression);
        return args.length > 0
            ? args
            : [{
                    field: "",
                    expression: expression
                }];
    }
    #parseAttributeValues(expression) {
        let actions = [];
        let matchCharacters = function (pattern) {
            for (i = i + 1; i < expression.length; i++) {
                switch (expression[i]) {
                    case pattern:
                        return true;
                    case "'":
                        if (!matchCharacters("'"))
                            return false;
                        break;
                    case '"':
                        if (!matchCharacters('"'))
                            return false;
                        break;
                    case "`":
                        if (!matchCharacters("`"))
                            return false;
                        break;
                    case "{":
                        if (!matchCharacters("}"))
                            return false;
                        break;
                }
            }
            return pattern === ";";
        };
        let fieldStart = 0;
        let fieldEnd = 0;
        let i = 0;
        let searchingForExpression = false;
        let addArgument = function () {
            actions.push({
                field: expression.substring(fieldStart, fieldEnd).replace(/['"`]/g, "").trim(),
                expression: expression.substring(fieldEnd + 1, i).trim()
            });
            fieldStart = i + 1;
            searchingForExpression = false;
        };
        for (; i < expression.length; i++) {
            switch (expression[i]) {
                case ":":
                    {
                        searchingForExpression = true;
                        break;
                    }
                case "'":
                case '"':
                case "`":
                    if (!searchingForExpression) {
                        if (!matchCharacters(expression[i]))
                            throw new Error("invalid field name");
                        fieldStart++;
                        searchingForExpression = true;
                        break;
                    }
                default:
                    {
                        if (!searchingForExpression)
                            break;
                        fieldEnd = i - 1;
                        if (!matchCharacters(";"))
                            throw new Error("invalid expression");
                        addArgument();
                        searchingForExpression = false;
                    }
            }
        }
        return actions;
    }
    #getHandlerFunction(attribute) {
        return this.#options.attribute.handlers.get(attribute);
    }
    #trackElements() {
        let elements = this.#getTrackableElements();
        for (let element of elements)
            this.#trackElement(element);
    }
    #trackElement(element) {
        if (this.#isInTemplate(element))
            //Even though we're not tracking, send back that this is a new handle
            return true;
        //Don't load if we're lazy && not trying to load
        if (element.matches(this.#lazyLoadElementSelector))
            return;
        let selector = this.#trackableElementSelector;
        if (!element.matches(selector)) {
            this.#untrackElement(element);
            return;
        }
        this.#removeOnAttributeEventListeners(element);
        this.#updateDelayedAttributes(element);
        let newTrack = this.#updateElementExecuters(element);
        if (newTrack) {
            //Send a track event
            let modelName = element.getAttribute(this.attribute(this.#options.attribute.names.model)) ?? undefined;
            this.dispatch(element, "track", modelName, undefined);
        }
        return newTrack;
    }
    async #bindScriptModels() {
        const promises = [];
        for (let script of this.#root.querySelectorAll(this.#bindScriptModelSelector))
            promises.push(this.#bindScriptModel(script));
        await Promise.allSettled(promises);
    }
    async #bindScriptModel(script) {
        if (this.#isInTemplate(script))
            return;
        const bindAttribute = this.attribute(this.options.attribute.names.bind);
        const silentAttribute = this.attribute(this.options.attribute.names.silent);
        const arg = this.parseAttributeArguments(script, bindAttribute)[0];
        if (arg == null)
            return;
        const remoteJson = arg.field !== "";
        const modelName = remoteJson ? arg.field : arg.expression;
        let state = null;
        if (remoteJson) {
            try {
                const file = await fetch(arg.expression);
                state = await file.json();
            }
            catch (error) {
                console.error(error);
                return;
            }
        }
        else {
            state = JSON.parse(script.textContent);
        }
        const silent = script.matches(silentAttribute);
        this.bind(modelName, state, { silent: silent });
    }
    #isInTemplate(element) {
        while (element !== null) {
            if (element instanceof HTMLTemplateElement)
                return true;
            element = element.parentElement;
        }
        return false;
    }
    get #bindScriptModelSelector() {
        const bindAttribute = this.attribute(this.options.attribute.names.bind);
        return `script[type="application/json"][${bindAttribute}]`;
    }
    #updateDelayedAttributes(element) {
        let throttleAttribute = this.attribute(this.#options.attribute.names.throttle);
        let debounceAttribute = this.attribute(this.#options.attribute.names.debounce);
        let delayAttribute = this.attribute(this.#options.attribute.names.delay);
        if (!element.hasAttribute(throttleAttribute) && !element.hasAttribute(debounceAttribute) && !element.hasAttribute(delayAttribute)) {
            this.#elementHandlerDelays.delete(element);
            return;
        }
        if (!this.#elementHandlerDelays.has(element))
            this.#elementHandlerDelays.set(element, new Map());
    }
    #untrackElement(element) {
        let elementExecuters = this.#htmlExcecuters.get(element);
        if (elementExecuters === undefined)
            return;
        //Send an untrack event
        let modelName = element.getAttribute(this.attribute(this.#options.attribute.names.model)) ?? undefined;
        if (this.dispatch(element, "untrack", modelName, undefined))
            return;
        //Allow the element not to detach if we prevented the default behavior
        this.#htmlExcecuters.delete(element);
        this.#removeOnAttributeEventListeners(element);
    }
    #removeOnAttributeEventListeners(element) {
        let listeners = this.#onDomEventListeners.get(element);
        if (listeners == null)
            return;
        for (let eventType of listeners.keys()) {
            element.removeEventListener(eventType, listeners.get(eventType));
        }
        this.#onDomEventListeners.delete(element);
    }
    #addOnAttributeEventListener(element, eventType, mockedAttributes) {
        let elementListeners = this.#onDomEventListeners.get(element);
        if (elementListeners == null) {
            elementListeners = new Map();
            this.#onDomEventListeners.set(element, elementListeners);
        }
        if (elementListeners.has(eventType))
            return;
        let modelAttribute = this.attribute(this.#options.attribute.names.model);
        let modelPath = element.getAttribute(modelAttribute);
        modelPath = this.#mockModelPath(modelPath, this.attribute(this.#options.attribute.names.on), mockedAttributes);
        const app = this;
        let listener = event => {
            app.dispatch(element, "on", modelPath, event);
        };
        elementListeners.set(eventType, listener);
        element.addEventListener(eventType, listener);
    }
    #updateElementExecuters(element) {
        let created = this.#clearElementExecuters(element);
        const modelAttribute = this.attribute(this.#options.attribute.names.model);
        const modelPath = element.getAttribute(modelAttribute);
        //Only add the normal executers if we aren't mocking, otherwise let the mock attribute handle it
        if (!this.#addMockAttributeHandler(element, modelPath))
            this.#addElementExecuters(element, modelPath, new Map());
        return created;
    }
    #clearElementExecuters(element) {
        let elementExecuters = this.#htmlExcecuters.get(element);
        if (elementExecuters === undefined) {
            elementExecuters = new Map();
            this.#htmlExcecuters.set(element, elementExecuters);
            return true;
        }
        else {
            this.#removeOnAttributeEventListeners(element);
            elementExecuters.clear();
        }
        return false;
    }
    #addElementExecuters(element, modelPath, mockedAttributes) {
        let mutationEvents = this.#parseElementMutationEvents(element);
        let possibleEventTypes = [
            'track',
            'untrack',
            'bind',
            'unbind',
            'set',
            'on',
            'input',
            "routing.start",
            "routing.resolve",
            "routing.reject",
        ];
        for (let key of mutationEvents.keys()) {
            if (mutationEvents.get(key) === true)
                possibleEventTypes.push(key);
        }
        this.#addInitHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addSetPropertyHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addSetAttributeHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addToggleClassHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addToggleAttributeHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addRemoveElementHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addInputHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addExecuteEventCallbackHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addElementEventListenersHandler(element, modelPath, possibleEventTypes, mockedAttributes);
        this.#addGenerateComponentHandler(element, modelPath, possibleEventTypes, mockedAttributes);
    }
    #addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, parseArgs, mockedAttributes) {
        if (!element.hasAttribute(attribute))
            return;
        //Mock the model path if necessary
        modelPath = this.#mockModelPath(modelPath, attribute, mockedAttributes);
        let args = parseArgs ? this.parseAttributeArguments(element, attribute)
            : [
                {
                    field: "",
                    expression: element.getAttribute(attribute)
                }
            ];
        let handler = this.#getHandlerFunction(attribute);
        let elementExecuters = this.#htmlExcecuters.get(element);
        for (let eventType of eventTypes) {
            if (!possibleEventTypes.includes(eventType))
                continue;
            for (let arg of args) {
                let eventExecuters = elementExecuters.get(eventType);
                if (eventExecuters === undefined) {
                    eventExecuters = new Map();
                    elementExecuters.set(eventType, eventExecuters);
                }
                let modelExecuters = eventExecuters.get(modelPath);
                if (modelExecuters === undefined) {
                    modelExecuters = [];
                    eventExecuters.set(modelPath, modelExecuters);
                }
                modelExecuters.push({
                    arg: arg,
                    handler: handler
                });
            }
        }
        return args;
    }
    #mockModelPath(path, attribute, mockedAttributes) {
        if (mockedAttributes.has(attribute)) {
            return mockedAttributes.get(attribute);
        }
        else if (mockedAttributes.has("*")) {
            return mockedAttributes.get("*");
        }
        return path;
    }
    #addInitHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.init);
        let eventTypes = [
            'track',
            // 'untrack',
            'bind',
            // 'unbind',
            // 'set',
            // 'input',
            // "on",
            "routing.start",
            "routing.resolve",
            "routing.reject",
            // "mutation.target.added",
            // "mutation.target.removed",
            "mutation.target.attribute",
            // "mutation.target.characterdata",
            // "mutation.parent.added",
            // "mutation.parent.removed",
            // "mutation.parent.attribute",
            // "mutation.parent.characterdata",
            // "mutation.child.added",
            // "mutation.child.removed",
            // "mutation.child.attribute",
            // "mutation.child.characterdata"
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, true, mockedAttributes);
    }
    #addSetPropertyHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.property);
        let eventTypes = [
            'track',
            'bind',
            'set',
            "routing.start",
            "routing.resolve",
            "routing.reject",
            "mutation.target.added",
            "mutation.target.removed",
            "mutation.target.attribute",
            "mutation.target.characterdata",
            "mutation.parent.added",
            "mutation.parent.removed",
            "mutation.parent.attribute",
            "mutation.parent.characterdata",
            "mutation.child.added",
            "mutation.child.removed",
            "mutation.child.attribute",
            "mutation.child.characterdata"
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, true, mockedAttributes);
    }
    #addToggleClassHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.class);
        let eventTypes = [
            'track',
            'bind',
            'set',
            "routing.start",
            "routing.resolve",
            "routing.reject",
            "mutation.target.added",
            "mutation.target.removed",
            "mutation.target.attribute",
            "mutation.target.characterdata",
            "mutation.parent.added",
            "mutation.parent.removed",
            "mutation.parent.attribute",
            "mutation.parent.characterdata",
            "mutation.child.added",
            "mutation.child.removed",
            "mutation.child.attribute",
            "mutation.child.characterdata"
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, true, mockedAttributes);
    }
    #addToggleAttributeHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.toggle);
        let eventTypes = [
            'track',
            'bind',
            'set',
            "routing.start",
            "routing.resolve",
            "routing.reject",
            "mutation.target.added",
            "mutation.target.removed",
            "mutation.target.attribute",
            "mutation.target.characterdata",
            "mutation.parent.added",
            "mutation.parent.removed",
            "mutation.parent.attribute",
            "mutation.parent.characterdata",
            "mutation.child.added",
            "mutation.child.removed",
            "mutation.child.attribute",
            "mutation.child.characterdata"
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, true, mockedAttributes);
    }
    #addRemoveElementHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.remove);
        let eventTypes = [
            'unbind'
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, false, mockedAttributes);
    }
    #addSetAttributeHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.attribute);
        let eventTypes = [
            'track',
            'untrack',
            'bind',
            'unbind',
            'set',
            "routing.start",
            "routing.resolve",
            "routing.reject",
            "mutation.target.added",
            "mutation.target.removed",
            "mutation.target.attribute",
            "mutation.target.characterdata",
            "mutation.parent.added",
            "mutation.parent.removed",
            "mutation.parent.attribute",
            "mutation.parent.characterdata",
            "mutation.child.added",
            "mutation.child.removed",
            "mutation.child.attribute",
            "mutation.child.characterdata"
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, true, mockedAttributes);
    }
    #addInputHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.input);
        let eventTypes = [
            "input"
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, true, mockedAttributes);
    }
    #addExecuteEventCallbackHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.event);
        let eventTypes = [
            'track',
            'untrack',
            'bind',
            'unbind',
            'set',
            'input',
            "on",
            "routing.start",
            "routing.resolve",
            "routing.reject",
            "mutation.target.added",
            "mutation.target.removed",
            "mutation.target.attribute",
            "mutation.target.characterdata",
            "mutation.parent.added",
            "mutation.parent.removed",
            "mutation.parent.attribute",
            "mutation.parent.characterdata",
            "mutation.child.added",
            "mutation.child.removed",
            "mutation.child.attribute",
            "mutation.child.characterdata"
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, true, mockedAttributes);
    }
    #addElementEventListenersHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.on);
        let eventTypes = [
            "on"
        ];
        let args = this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, true, mockedAttributes);
        if (args == null)
            return;
        for (let arg of args) {
            this.#addOnAttributeEventListener(element, arg.field, mockedAttributes);
        }
    }
    #addGenerateComponentHandler(element, modelPath, possibleEventTypes, mockedAttributes) {
        let attribute = this.attribute(this.#options.attribute.names.component);
        let eventTypes = [
            'track',
            'bind',
            "set",
            "routing.start",
            "routing.resolve",
            "routing.reject",
            // "mutation.target.added",
            // "mutation.target.removed",
            "mutation.target.attribute",
            // "mutation.target.characterdata",
            // "mutation.parent.added",
            // "mutation.parent.removed",
            // "mutation.parent.attribute",
            // "mutation.parent.characterdata",
            // "mutation.child.added",
            // "mutation.child.removed",
            // "mutation.child.attribute",
            // "mutation.child.characterdata"
        ];
        this.#addExecuters(element, attribute, modelPath, eventTypes, possibleEventTypes, false, mockedAttributes);
    }
    #addMockAttributeHandler(element, modelPath) {
        let attribute = this.attribute(this.#options.attribute.names.mock);
        let eventTypes = [
            'track',
            'bind',
            'set',
            "mutation.target.attribute"
        ];
        //override the possible types with the event types because it will always be these
        return this.#addExecuters(element, attribute, modelPath, eventTypes, eventTypes, false, new Map())?.length > 0;
    }
    #getTrackableElements(target) {
        if (target == null)
            target = this.#root;
        let selector = this.#trackableElementSelector;
        let elements = [];
        if (target.matches(selector))
            elements.push(target);
        return elements.concat([...target.querySelectorAll(selector)]);
    }
    get #trackableElementSelector() {
        let modelAttribute = this.attribute(this.#options.attribute.names.model);
        return `:not(template)[${modelAttribute}]`;
    }
    get #componentTemplateSelector() {
        const templateAttribute = this.attribute(this.#options.attribute.names.template);
        const sourceAttribute = this.attribute(this.#options.attribute.names.source);
        return `template[${templateAttribute}],template[${sourceAttribute}]`;
    }
    #getExcecuters(eventType, targets = [], propPath = undefined) {
        const details = this.#determineEventDetailProperties(propPath, "property");
        const mockEvent = this.#createEvent(this.#root, eventType, details, null, null);
        const results = new Map();
        if (targets == null)
            return results;
        let filterModels = propPath != undefined && propPath.trim() != "";
        for (let element of this.#htmlExcecuters.keys()) {
            const nestedArgs = this.parseAttributeArguments(element, this.attribute(this.#options.attribute.names.nested));
            const nested = (nestedArgs?.length ?? 0) > 0;
            if (targets != null && targets.length > 0 && !targets.includes(element))
                continue;
            let eventExecuters = this.#htmlExcecuters.get(element).get(eventType);
            if (eventExecuters == undefined || eventExecuters.size === 0)
                continue;
            let exectuers = new Map();
            if (filterModels) {
                for (let modelPath of eventExecuters.keys()) {
                    //if(nested)
                    if (!this.#checkIfModelChangeApplies(modelPath, propPath, mockEvent.detail, nestedArgs))
                        continue;
                    let modelExecuters = eventExecuters.get(modelPath);
                    if (modelExecuters == undefined || modelExecuters.length === 0)
                        continue;
                    exectuers.set(modelPath, modelExecuters);
                }
            }
            else {
                for (let property of eventExecuters.keys())
                    exectuers.set(property, eventExecuters.get(property));
            }
            results.set(element, exectuers);
        }
        //TODO: filter out any conditionals, static, etc.
        return results;
    }
    #checkIfModelChangeApplies(modelPath, propPath, detail, nestedArgs) {
        if (modelPath !== propPath
            && modelPath !== detail.modelPath //Not a change to a property on our model
            && !modelPath.startsWith(propPath) //Not a change in our parent
            && (((nestedArgs?.length ?? 0) === 0) || !this.#passedNestedCheck(detail, modelPath, nestedArgs))) //not a nested change we're looking for
            return false;
        return true;
    }
    dispatch(target, eventType, propPath, data) {
        try {
            return this.#handleDispatch(target, eventType, propPath, data);
        }
        catch (error) {
            if (error instanceof Error)
                throw error;
            console.error(error);
            return false;
        }
    }
    #handleDispatch(target, eventType, propPath, data) {
        let dispatchId;
        let dispatchTimer;
        if (this.#options.debug.dispatchTimer) {
            dispatchId = this.#dispatchId++;
            dispatchTimer = `hydrate.dispatch.${eventType}.${dispatchId}`;
            console.time(dispatchTimer);
        }
        //Data is any additional object data that may be needed for an event
        let detail = this.#determineEventDetailProperties(propPath, "property");
        let listenerEvent = this.#createEvent(target, eventType, detail, null, data);
        let dispatchElement = target.isConnected ? target : this.#root;
        dispatchElement.dispatchEvent(listenerEvent);
        if (listenerEvent.defaultPrevented)
            return true;
        let elements;
        if (eventType.startsWith("mutation.child"))
            elements = target.parentElement !== null ? [target.parentElement] : [];
        else if (eventType.startsWith("mutation.target"))
            elements = [target];
        else if (eventType.startsWith("mutation.parent")) {
            elements = [];
            for (let node of target.childNodes)
                if (node instanceof HTMLElement)
                    elements.push(node);
            if (elements.length === 0)
                elements = null;
        }
        else
            elements = this.#getTrackableElements(target);
        elements = this.#appendShadowDomElements(elements);
        let elementExecuters = this.#getExcecuters(eventType, elements, propPath);
        for (let element of elementExecuters.keys()) {
            let modelExecuters = elementExecuters.get(element);
            if (this.#throttle(eventType, element, propPath, listenerEvent.detail, target, data))
                continue;
            if (this.#debounce(eventType, element, propPath, listenerEvent.detail, target, data))
                continue;
            if (this.#delay(eventType, element, propPath, listenerEvent.detail, target, data))
                continue;
            this.#dispatchDomEvents(eventType, element, modelExecuters, propPath, detail, target, data);
        }
        if (this.#options.debug.dispatchTimer) {
            console.timeEnd(dispatchTimer);
        }
        return listenerEvent.defaultPrevented;
    }
    #appendShadowDomElements(elements) {
        if (elements == null)
            return null;
        const results = [];
        for (let element of elements) {
            results.push(element);
            if (element.shadowRoot)
                //@ts-ignore because will assume all of the child elements are html elements
                results.push(...element.shadowRoot.children);
        }
        return results;
    }
    #throttle(eventType, element, propPath, detail, target, data) {
        let throttleAttribute = this.attribute(this.#options.attribute.names.throttle);
        let throttleArg = this.parseAttributeArguments(element, throttleAttribute)
            .find(x => x.field === eventType || x.field === "*");
        if (throttleArg == null)
            return false;
        let delayHandlers = this.#elementHandlerDelays.get(element);
        if (delayHandlers == null)
            return false;
        let dispatch = delayHandlers.get(eventType);
        if (dispatch?.timeout == null) {
            let delay = this.#parseDelayMs(detail, throttleArg);
            const app = this;
            dispatch = {
                timeout: null,
                eventType: null,
                element: null,
                propPath: null,
                detail: null,
                target: null,
                data: null
            };
            delayHandlers.set(eventType, dispatch);
            dispatch.timeout = setTimeout(() => {
                let dispatch = app.#elementHandlerDelays?.get(element)?.get(eventType);
                if (dispatch == null)
                    return;
                dispatch.timeout = null;
                if (dispatch?.element == null)
                    return;
                let modelExecuters = app.#getExcecuters(dispatch.eventType, [dispatch.element], dispatch.propPath)?.get(dispatch.element);
                app.#dispatchDomEvents(dispatch.eventType, dispatch.element, modelExecuters, dispatch.propPath, dispatch.detail, dispatch.target, dispatch.data);
            }, delay);
            return false;
        }
        else {
            dispatch = {
                timeout: dispatch.timeout,
                eventType: eventType,
                element: element,
                propPath: propPath,
                detail: detail,
                target: target,
                data: data
            };
            delayHandlers.set(eventType, dispatch);
            return true;
        }
    }
    #parseDelayMs(detail, arg) {
        let delay = 0;
        try {
            delay = this.resolveArgumentValue(detail, arg, null);
            if (!Number.isInteger(delay))
                console.error("delay is not a number");
        }
        catch (err) {
            console.error(err);
        }
        return delay;
    }
    #debounce(eventType, element, propPath, detail, target, data) {
        let debounceAttribute = this.attribute(this.#options.attribute.names.debounce);
        let arg = this.parseAttributeArguments(element, debounceAttribute)
            .find(x => x.field === eventType || x.field === "*");
        if (arg == null)
            return false;
        let delayHandlers = this.#elementHandlerDelays.get(element);
        if (delayHandlers == null)
            return false;
        let dispatch = delayHandlers.get(eventType);
        if (dispatch?.timeout != null)
            clearTimeout(dispatch.timeout);
        let delay = this.#parseDelayMs(detail, arg);
        const app = this;
        dispatch = {
            timeout: null,
            eventType: eventType,
            element: element,
            propPath: propPath,
            detail: detail,
            target: target,
            data: data
        };
        delayHandlers.set(eventType, dispatch);
        dispatch.timeout = setTimeout(() => {
            let dispatch = app.#elementHandlerDelays?.get(element)?.get(eventType);
            if (dispatch == null)
                return;
            dispatch.timeout = null;
            if (dispatch?.element == null)
                return;
            let modelExecuters = app.#getExcecuters(dispatch.eventType, [dispatch.element], dispatch.propPath)?.get(dispatch.element);
            app.#dispatchDomEvents(dispatch.eventType, dispatch.element, modelExecuters, dispatch.propPath, dispatch.detail, dispatch.target, dispatch.data);
        }, delay);
        return true;
    }
    #delay(eventType, element, propPath, detail, target, data) {
        let delayAttribute = this.attribute(this.#options.attribute.names.delay);
        let arg = this.parseAttributeArguments(element, delayAttribute)
            .find(x => x.field === eventType || x.field === "*");
        if (arg == null)
            return false;
        let delay = this.#parseDelayMs(detail, arg);
        const app = this;
        setTimeout(() => {
            let modelExecuters = app.#getExcecuters(eventType, [element], propPath)?.get(element);
            app.#dispatchDomEvents(eventType, element, modelExecuters, propPath, detail, target, data);
        }, delay);
        return true;
    }
    #dispatchDomEvents(eventType, element, modelExecuters, propPath, detail, target, data) {
        if (modelExecuters == null)
            return;
        for (let modelPath of modelExecuters.keys()) {
            let event;
            if (propPath === modelPath) {
                event = this.#createEvent(element, eventType, this.#determineEventDetailProperties(propPath, "model"), null, data);
            }
            else if (modelPath === detail.modelPath) {
                //Touched property of the model
                event = this.#createEvent(element, eventType, this.#determineEventDetailProperties(propPath, "property"), null, data);
                //eventDetails = new HydrateModelEventDetails(this, element, eventType, property, this.state(property), nestedEvent);
            }
            else {
                let nestedEvent = this.#createEvent(target, eventType, this.#determineEventDetailProperties(propPath, "property"), null, data);
                event = this.#createEvent(element, eventType, this.#determineEventDetailProperties(modelPath, "model"), nestedEvent.detail, data);
            }
            if (!this.#shouldUpdateComponent(event))
                continue;
            for (let executer of modelExecuters.get(modelPath)) {
                try {
                    if (!element.isConnected)
                        continue;
                    executer.handler(executer.arg, event.detail);
                }
                catch (error) {
                    if (error instanceof Error)
                        throw error;
                    console.error(error);
                }
            }
        }
    }
    #shouldUpdateComponent(event) {
        const detail = event.detail;
        const modelName = detail.element.getAttribute(this.attribute(this.#options.attribute.names.model));
        const resumeAttribute = this.attribute(this.#options.attribute.names.resume);
        const routingAttribute = this.attribute(this.#options.attribute.names.routing);
        if (detail.type === "track" && detail.element.hasAttribute(resumeAttribute))
            return false;
        if (this.#isRoutingEvent(detail.type) && !detail.element.hasAttribute(routingAttribute))
            return false;
        if (!this.#passedIfCheck(detail, this.parseAttributeArguments(detail.element, this.attribute(this.#options.attribute.names.if))))
            return false;
        if (!this.#passedFilterCheck(detail, modelName, this.parseAttributeArguments(detail.element, this.attribute(this.#options.attribute.names.filter))))
            return false;
        return true;
    }
    #passedIfCheck(detail, args) {
        if (args == null || args.length === 0)
            return true;
        try {
            for (let arg of args) {
                if (arg.field !== "*" && arg.field !== detail.type)
                    continue;
                if (!this.resolveArgumentValue(detail, arg, null))
                    return false;
            }
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    #passedFilterCheck(detail, baseModelPath, args) {
        //If there is no property, then let it go through because we must respond to all model changes
        if (args == null || args.length === 0)
            return true;
        //This means we had an tempty h-filter attribute which means respond to no child properties
        if (args.length === 1 && args[0].field.match(/^[ \*]$/) && args[0].expression.match(/^[ \*]$/))
            return detail.propName == null;
        for (let arg of args) {
            if (arg.field !== "*" && arg.field !== detail.type)
                continue;
            for (let propName of arg.expression.split(/[,;\s]+/)) {
                if (detail.modelPath === baseModelPath) {
                    if (detail.propName == null || arg.expression.match(/^[ \*]$/) || detail.propName === propName)
                        return true;
                }
                else if (detail.propName == null) {
                    if (detail.modelPath === `${baseModelPath}.${propName}`)
                        return true;
                }
                else if (detail.propPath === `${baseModelPath}.${propName}`)
                    return true;
            }
        }
        return false;
    }
    #passedNestedCheck(detail, baseModelPath, args) {
        //If there is no property, then let it go through because we must respond to all model changes
        const modelPath = detail.propPath ?? detail.modelPath;
        if (args == null || args.length === 0)
            return modelPath === baseModelPath;
        //This means we had an tempty h-nested attribute which means respond to all parent changes
        if (args.length === 1 && args[0].field === "" && (args[0].expression.trim() === "" || args[0].expression === "*"))
            return modelPath.match(`^${baseModelPath}\\..*|^${baseModelPath}$`) != null;
        for (let arg of args) {
            if (arg.field !== "*" && arg.field !== detail.type)
                continue;
            for (let nestedPath of arg.expression.split(/[,;\s]+/)) {
                const path = `${baseModelPath}.${nestedPath}`;
                if (nestedPath === "*" && detail.modelPath.match(`^${baseModelPath}\\..*|^${baseModelPath}$`))
                    return true;
                if (modelPath.match((`^${path}\\..*|^${path}$`)))
                    return true;
            }
        }
        return false;
    }
    #createEvent(target, eventType, properties, nested, data) {
        switch (eventType) {
            case "bind":
            case "set":
            case "unbind":
                {
                    let detail = new HydrateModelEventDetails(this, target, eventType, properties, nested);
                    return new HydrateModelEvent(detail);
                }
            case "input":
                {
                    let detail = new HydrateElementInputEventDetails(this, target, eventType, properties, data);
                    return new HydrateElementInputEvent(detail);
                }
            case "routing.start":
            case "routing.resolve":
            case "routing.reject":
                {
                    let detail = new HydrateRouteEventDetails(this, target, eventType, properties, data);
                    return new HydrateRouteEvent(detail);
                }
            case "track":
            case "untrack":
                {
                    let detail = new HydrateElementTrackingEventDetails(this, target, eventType, properties);
                    return new HydrateElementTrackingEvent(detail);
                }
            case "mutation.target.attribute":
            case "mutation.target.characterdata":
            case "mutation.target.added":
            case "mutation.target.removed":
            case "mutation.parent.attribute":
            case "mutation.parent.characterdata":
            case "mutation.parent.added":
            case "mutation.parent.removed":
            case "mutation.child.attribute":
            case "mutation.child.characterdata":
            case "mutation.child.added":
            case "mutation.child.removed":
                {
                    let detail = new HydrateElementMutationEventDetails(this, target, eventType, properties, data);
                    return new HydrateElementMutationEvent(detail);
                }
            case "on":
                {
                    let detail = new HydrateElementEventListenerEventDetails(this, target, eventType, properties, data);
                    return new HydrateElementEventListenerEvent(detail);
                }
        }
    }
    #determineEventDetailProperties(path, type) {
        let index = path != null ? path.lastIndexOf(".") : -1;
        let propName = type === "model" || index < 0 ? undefined : path.substring(index + 1);
        let propPath = type === "model" || index < 0 ? undefined : path;
        let modelPath = type === "model" || index < 0 ? path : path.substring(0, index);
        index = modelPath != null ? modelPath.lastIndexOf(".") : -1;
        let modelName = index < 0 ? modelPath : modelPath.substring(index + 1);
        index = modelPath != null ? modelPath.lastIndexOf(".") : -1;
        let parentPath = index < 0 ? null : modelPath.substring(0, index);
        index = parentPath != null ? parentPath.lastIndexOf(".") : -1;
        let parentName = index < 0 ? parentPath : parentPath.substring(index + 1);
        index = modelPath != null ? modelPath.indexOf(".") : -1;
        let baseName = index < 0 ? modelPath : modelPath.substring(0, index);
        return {
            propName,
            propPath,
            modelPath,
            modelName,
            baseName,
            parentName,
            parentPath
        };
    }
}
