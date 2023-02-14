import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { CommentDto } from "../../models/dtos.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";

export type CommentComponentState = CommentDto[];

export class CommentComponent extends HydrateComponent<CommentComponentState> {

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

    likedComment(comment:CommentDto):boolean {
        const userId = this.#auth.user.userId;
        return comment.likes.findIndex(x => x.user.userId === userId) > -1;
    }

    async toggleLike(comment:CommentDto):Promise<void> {
        const user = this.#auth.user;
        const response = this.likedComment(comment)
            ? await this.#api.unlikeComment(user.userId, comment.commentId)
            : await this.#api.likeComment(user.userId, comment.commentId);
        if(response.success) {
            const index = this.state.findIndex(x => x.commentId === comment.commentId);
            this.model[index].likes = response.result.likes;
        }
        else {
            console.error(response.error);
        }
    }

}