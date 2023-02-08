import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";

export type LoggingLevel = "info" | "debug" | "trace" | "warn" | "error";

export class LoggerService extends HydrateAppService
{
    #logLevel:LoggingLevel;
    #loggingPriority:Map<LoggingLevel, number>;

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

    get logLevel():LoggingLevel {
        return this.#logLevel;
    }

    set logLevel(level:LoggingLevel) {
        this.#logLevel = level;
    }

    levelEnabled(level:LoggingLevel):boolean {
        return this.#loggingPriority.get(this.#logLevel) >= this.#loggingPriority.get(level);
    }

    log(...data:any[]):void {
        //Always log so we can override logging level if needed
        console.log(this.#timeStamp, ...data);
    }

    info(...data:any[]):void {
        if(this.levelEnabled("info"))
            console.info(this.#timeStamp, ...data);
    }

    debug(...data:any[]):void {
        if(this.levelEnabled("debug"))
            console.debug(this.#timeStamp, ...data);
    }

    trace(...data:any[]):void {
        if(this.levelEnabled("trace"))
            console.trace(this.#timeStamp, ...data);
    }

    warn(...data:any[]):void {
        if(this.levelEnabled("warn"))
            console.warn(this.#timeStamp, ...data);
    }

    error(...data:any[]):void {
        if(this.levelEnabled("error"))
            console.error(this.#timeStamp, ...data);
    }

    get #timeStamp() {
        const date = new Date();
        return `<${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}:${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}:${date.getUTCMilliseconds()}>`;
    }
}

export let LoggerServiceFactory:HydrateAppServiceFactory<LoggerService> = function(hydrate:HydrateApp, source:any) {
    return new LoggerService();
}