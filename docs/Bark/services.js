import { LoggerService, LoggerServiceFactory } from "./services/logger/service.js";
import { AuthService, AuthServiceFactory } from "./services/auth/service.js";
import { UuidService, UuidServiceFactory } from "./services/uuid/service.js";
import { ApiService, ApiServiceFactory } from "./services/api/service.js";
import { StorageService, StorageServiceFactory } from "./services/storage/service.js";
export let AppServices = [
    { type: "scoped", definition: LoggerService, factory: LoggerServiceFactory },
    { type: "singleton", definition: AuthService, factory: AuthServiceFactory },
    { type: "singleton", definition: UuidService, factory: UuidServiceFactory },
    { type: "singleton", definition: ApiService, factory: ApiServiceFactory },
    { type: "singleton", definition: StorageService, factory: StorageServiceFactory }
];
