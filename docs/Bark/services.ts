import { HydrateAppServiceDefinition, HydrateAppServiceFactory, HydrateAppDependencyType } from "./lib/hydrate/hydrate.js";

import { LoggerService, LoggerServiceFactory } from "./services/logger/service.js";
import { AuthService, AuthServiceFactory } from "./services/auth/service.js";
import { UuidService, UuidServiceFactory } from "./services/uuid/service.js";
import { ApiService, ApiServiceFactory } from "./services/api/service.js";
import { StorageService, StorageServiceFactory } from "./services/storage/service.js";
import { DataSeederService, DataSeederServiceFactory } from "./services/data-seeder/service.js";
export interface AppDependency<T> {
    type: HydrateAppDependencyType;
    definition: HydrateAppServiceDefinition<T>;
    factory: HydrateAppServiceFactory<T>;
}

export let AppServices: AppDependency<any>[] = [
	{ type: "scoped", definition: LoggerService, factory: LoggerServiceFactory},
	{ type: "singleton", definition: AuthService, factory: AuthServiceFactory},
	{ type: "singleton", definition: UuidService, factory: UuidServiceFactory},
	{ type: "singleton", definition: ApiService, factory: ApiServiceFactory},
	{ type: "singleton", definition: StorageService, factory: StorageServiceFactory},
	{ type: "singleton", definition: DataSeederService, factory: DataSeederServiceFactory}
];