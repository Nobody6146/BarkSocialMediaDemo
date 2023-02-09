import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
import { ButtonComponentState } from "../generic/button/index.js";
import { PostComponentState } from "../post/index.js";
// import { APP_NAME } from "../../components/root/index.js"

interface HomeComponentState {
    posts:PostComponentState
}

const APP_NAME = "Demo App";

export class HomeComponent extends HydrateComponent<HomeComponentState> {

    #auth:AuthService;
    #api:ApiService;

    async onInit(eventDetails:HydrateEventDetails):Promise<void> {
        this.#auth = this.dependency(AuthService);
        this.#api = this.dependency(ApiService);
        this.model = {
            posts: await this.#api.posts()//this.posts().concat(this.posts()).concat(this.posts()).concat(this.posts()).concat(this.posts()).concat(this.posts()).concat(this.posts()).concat(this.posts())//await this.#api.posts()
        }
        this.#auth = this.dependency(AuthService);
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }

    // posts():PostComponentState {
    //     return [
    //         {
    //             id: "0",
    //             date: "2021/12/01",
    //             user: {
    //                 userId: "0",
    //                 emailAddress: "test@email.com",
    //                 username: "@yourboy",
    //                 image: "images/logo.png",
    //                 firstName: "John",
    //                 lastName: "Doe",
    //             },
    //             text: "This is the coolest link that I've seen all day. Too bad I can't share it without the government drones shooting me down. #IKnowWhoDid911"
    //         }
    //     ]
    // }
}