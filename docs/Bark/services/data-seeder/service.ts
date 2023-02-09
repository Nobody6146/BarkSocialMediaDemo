import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";
import { BarkLogin, BarkPost, BarkProfile } from "../../models/models.js";
import { UuidService } from "../uuid/service.js";

interface SeedData {
    logins:BarkLogin[];
    profiles:BarkProfile[];
    posts:BarkPost[];
}

export class DataSeederService extends HydrateAppService
{
    #uuid:UuidService;

    constructor(hydrate:HydrateApp) {
        super();
        this.#uuid = hydrate.dependency(UuidService, this).instance;
    }

    #clone<T>(data:T):T {
        return JSON.parse(JSON.stringify(data));
    }

    seedData(): SeedData
    {  
        const logins:BarkLogin[]= [
            {
                id: this.#uuid.generateUUID(),
                emailAddress: "test1@email.com",
                password: "#Password123",
                username: "@johnnyboy11",
            },
            {
                id: this.#uuid.generateUUID(),
                emailAddress: "test2@email.com",
                password: "#Password123",
                username: "@themastertatertot",
            },
            {
                id: this.#uuid.generateUUID(),
                emailAddress: "test3",
                password: "#Password123",
                username: "@kawaiichief23",
            }
        ];

        const profiles:BarkProfile[] = [
            {
                id: this.#uuid.generateUUID(),
                firstName: "John",
                lastName: "Doe",
                image: "images/logo.png",
                loginId: logins[0].id
            },
            {
                id: this.#uuid.generateUUID(),
                firstName: "Matthew",
                lastName: "Smith",
                image: "images/logo.png",
                loginId: logins[1].id
            },
            {
                id: this.#uuid.generateUUID(),
                firstName: "Barbara",
                lastName: "Seller",
                image: "images/logo.png",
                loginId: logins[2].id
            }
        ];

        const dates = [
            new Date().toISOString(),
            "2021-12-31T04:00:00.751Z",
            "2022-02-09T21:15:00.751Z",
            "2022-05-21T17:57:00.751Z",
            "2023-01-01T01:55:00.751Z",
            "2023-09-14T12:23:00.751Z",
        ];
        const someLongText = "Yo, this is some really long text about a prompt I don't even know exists yet. There might be some day where I decide to do something different with my life but I don't think thtat today with be that day because I have no idea what I am even doing at the momment so I should probably stop...";
        const randomLogin = function():BarkLogin {
            return logins[Math.floor(Math.random() * (logins.length - 1))];
        }
        const randomText = function():string {
            return someLongText.substring(0, Math.floor(Math.random() * someLongText.length))
        }
        const randomDate = function():string {
            return dates[Math.floor(Math.random() * (dates.length - 1))];
        }

        const posts:BarkPost[] = [];
        for(let i = 0; i < 20; i++)                     
            posts.push({
                id: this.#uuid.generateUUID(),
                date: randomDate(),
                loginId: randomLogin().id,
                text: randomText(),
            });
        return {
            logins,
            profiles,
            posts
        }
    }
}

export let DataSeederServiceFactory:HydrateAppServiceFactory<DataSeederService> = function(hydrate:HydrateApp, source:any) {
    return new DataSeederService(hydrate);
}