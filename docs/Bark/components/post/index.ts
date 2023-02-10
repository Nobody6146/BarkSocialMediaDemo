import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { PostDto } from "../../models/dtos.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";

export type PostComponentState = PostDto[];

export class PostComponent extends HydrateComponent<PostComponentState> {

    #auth:AuthService;
    #api:ApiService;

    onInit(eventDetails:HydrateEventDetails):void {
        this.#auth = this.dependency(AuthService);
        this.#api = this.dependency(ApiService);
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }

    likedPost(post:PostDto):boolean {
        const userId = this.#auth.user.userId;
        return post.likes.findIndex(x => x.user.userId === userId) > -1;
    }

    toggleLiked(post:PostDto):void {
        //this.#api.likePost(post);
    }
}