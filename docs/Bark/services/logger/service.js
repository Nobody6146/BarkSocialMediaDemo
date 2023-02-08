import { HydrateAppService } from "../../lib/hydrate/hydrate.js";
export class LoggerService extends HydrateAppService {
    #logLevel;
    #loggingPriority;
    constructor() {
        super();
        this.#logLevel = "debug";
        this.#loggingPriority = new Map();
        this.#loggingPriority.set("error", 1);
        this.#loggingPriority.set("warn", 2);
        this.#loggingPriority.set("info", 3);
        this.#loggingPriority.set("trace", 4);
        this.#loggingPriority.set("debug", 5);
    }
    get logLevel() {
        return this.#logLevel;
    }
    set logLevel(level) {
        this.#logLevel = level;
    }
    levelEnabled(level) {
        return this.#loggingPriority.get(this.#logLevel) >= this.#loggingPriority.get(level);
    }
    log(...data) {
        //Always log so we can override logging level if needed
        console.log(this.#timeStamp, ...data);
    }
    info(...data) {
        if (this.levelEnabled("info"))
            console.info(this.#timeStamp, ...data);
    }
    debug(...data) {
        if (this.levelEnabled("debug"))
            console.debug(this.#timeStamp, ...data);
    }
    trace(...data) {
        if (this.levelEnabled("trace"))
            console.trace(this.#timeStamp, ...data);
    }
    warn(...data) {
        if (this.levelEnabled("warn"))
            console.warn(this.#timeStamp, ...data);
    }
    error(...data) {
        if (this.levelEnabled("error"))
            console.error(this.#timeStamp, ...data);
    }
    get #timeStamp() {
        const date = new Date();
        return `<${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}:${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}:${date.getUTCMilliseconds()}>`;
    }
}
export let LoggerServiceFactory = function (hydrate, source) {
    return new LoggerService();
};
