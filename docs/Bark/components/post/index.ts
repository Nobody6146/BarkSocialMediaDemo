import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../lib/hydrate/hydrate.js";
import { PostDto } from "../../models/dtos.js";
import { PostDetailRoutePathBuilder } from "../../routes/post-detail/route.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";

export interface PostComponentPostState {
    post:PostDto;
    showComments:boolean;
}

export type PostComponentState = PostComponentPostState[];

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

    hasComments(post:PostDto):boolean {
        return post.comments.length > 0;
    }

    async toggleLike(post:PostDto):Promise<void> {
        const user = this.#auth.user;
        const response = this.likedPost(post)
            ? await this.#api.unlikePost(user.userId, post.postId)
            : await this.#api.likePost(user.userId, post.postId);
        if(response.success) {
            const index = this.state.findIndex(x => x.post.postId === post.postId);
            this.model[index].post.likes = response.result.likes;
        }
        else {
            console.error(response.error);
        }
    }

    viewPost(post:PostDto) {
        const route = PostDetailRoutePathBuilder(post.postId);
        this.hydrate.route(route);
    }
}