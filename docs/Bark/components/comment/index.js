import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
export class CommentComponent extends HydrateComponent {
    #auth;
    #api;
    onInit(eventDetails) {
        this.#auth = this.dependency(AuthService);
        this.#api = this.dependency(ApiService);
        console.log(this.state);
        console.log(this.likedComment(this.state[0]));
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
    likedComment(comment) {
        const userId = this.#auth.user.userId;
        return comment.likes.findIndex(x => x.user.userId === userId) > -1;
    }
    async toggleLike(comment) {
        const user = this.#auth.user;
        const response = this.likedComment(comment)
            ? await this.#api.unlikeComment(user.userId, comment.commentId)
            : await this.#api.likeComment(user.userId, comment.commentId);
        if (response.success) {
            const index = this.state.findIndex(x => x.commentId === comment.commentId);
            this.model[index].likes = response.result.likes;
        }
        else {
            console.error(response.error);
        }
    }
}