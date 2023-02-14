import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { PostDetailRoutePathBuilder } from "../../routes/post-detail/route.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
export class PostComponent extends HydrateComponent {
    #auth;
    #api;
    onInit(eventDetails) {
        this.#auth = this.dependency(AuthService);
        this.#api = this.dependency(ApiService);
    }
    onPreRender(eventDetails) {
    }
    onPostRender(eventDetails) {
    }
    onDestroy() {
    }
    likedPost(post) {
        const userId = this.#auth.user.userId;
        return post.likes.findIndex(x => x.user.userId === userId) > -1;
    }
    async toggleLike(post) {
        const user = this.#auth.user;
        const response = this.likedPost(post)
            ? await this.#api.unlikePost(user.userId, post.postId)
            : await this.#api.likePost(user.userId, post.postId);
        console.log(response);
        if (response.success) {
            const index = this.state.findIndex(x => x.postId === post.postId);
            this.model[index].likes = response.result.likes;
        }
        else {
            console.error(response.error);
        }
    }
    viewPost(post) {
        const route = PostDetailRoutePathBuilder(post.postId);
        this.hydrate.route(route);
    }
}
