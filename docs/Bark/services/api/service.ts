import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";
import { PostDto, UserDto } from "../../models/dtos.js";
import { BarkLogin, BarkPost } from "../../models/models.js";
import { StorageService } from "../storage/service.js";

export type ApiStatusCode = "200" | "201" | "400" | "401" | "409" | "500";

export interface ApiResponse<T> {
    statusCode:ApiStatusCode;
    success:boolean;
    result?:T;
    error?:string;
}

export interface ApiUser {
    id:string;
    username:string;
    emailAddress:string;
    password:string;
}

export class ApiService extends HydrateAppService
{
    #storage:StorageService;

    constructor(hydrate:HydrateApp) {
        super();
        this.#storage = hydrate.dependency(StorageService, this).instance;
    }

    #mapLoginToUser(login:BarkLogin):UserDto {
        const profile = this.#storage.profiles.find(x => x.loginId === login.id);
        return {
            userId: login?.id,
            emailAddress: login.emailAddress,
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            image: profile?.image,
            username: login.username
        };
    }

    async signIn(emailAddress:string, password:string):Promise<ApiResponse<UserDto>> {
        const login = this.#storage.logins.find(x => x.emailAddress === emailAddress && x.password === password);
        if(login)
            return {
                statusCode: "200",
                success: true,
                error: null,
                result: this.#mapLoginToUser(login)
            };
        return {
            statusCode: "401",
            success: false,
            error: "invalid login credentials",
            result: null
        };
    }

    async signUp(emailAddress:string, password:string):Promise<ApiResponse<null>> {
        const logins = this.#storage.logins;
        let login = logins.find(x => x.emailAddress === emailAddress && x.password === password);
        emailAddress.substring(0, emailAddress.indexOf("@"))
        if(login)
            return {
                statusCode: "409",
                success: false,
                error: "email is already in use",
                result: null
            };
        login = {
            id: emailAddress.replace(/\W+/g, ""),
            username: `@${emailAddress.substring(0, emailAddress.indexOf("@"))}`,
            emailAddress: emailAddress,
            password: password
        }
        logins.push(login);
        this.#storage.logins = logins;
        return {
            statusCode: "201",
            success: true,
            error: null,
            result: null
        };
    }

    async users():Promise<UserDto[]> {
        return this.#storage.logins.map(x => this.#mapLoginToUser(x));
    }

    async posts():Promise<PostDto[]> {
        const posts:BarkPost[] = this.#storage.posts;
        const users = await this.users();
        console.log(users);

        return posts.map(post => {
            const user = users.find(x => x.userId === post.loginId);
            return {
                id: post.id,
                date: post.date,
                user: user,
                text: post.text
            }
        });
    }
}

export let ApiServiceFactory:HydrateAppServiceFactory<ApiService> = function(hydrate:HydrateApp, source:any) {
    return new ApiService(hydrate);
}