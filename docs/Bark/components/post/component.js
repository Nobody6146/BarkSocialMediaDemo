import { HydrateComponent } from "../../lib/hydrate/hydrate.js";
import { PostDetailRoutePathBuilder } from "../../routes/post-detail/route.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
function argName(exp) {
    return name(exp);
}
function propName(exp) {
    return name(exp);
}
function name(exp) {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}
function postProp(exp) {
    return name(exp);
}
//******* HTML Template *******/
export let PostComponentTemplate = `<template h-model>
    <style h-style>
        :root {
            color: inherit;
        }
        
        :root .icon-inactive { 
            color: var(--color-ui-subtext);
            font-variation-settings:
                'FILL' 0,
                'wght' 400,
                'GRAD' 0,
                'opsz' 48;
        }
        
        :root .icon-active {
            color: var(--color-ui-text);
            font-variation-settings:
                'FILL' 1,
                'wght' 400,
                'GRAD' 0,
                'opsz' 48;
        }
        :root .post-text {
            width: 100%;
            height: 100px;
        }
    </style>
    <div style="box-sizing: border-box; display: flex; flex-direction: column; width: 100%; gap: 20px; border-bottom: 1px solid var(--color-compliment); padding: 10px">
        <div style="display: flex; width: 100%">
            <div style="box-sizing: border-box; max-width: 20%; margin-right: 20px;">
                <img h-model="^.${postProp(x => x.post.user)}" h-attribute="src: image" style="width: 100%;">
            </div>
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; gap: 10px;">
                    <span h-model="^.${postProp(x => x.post.user)}" h-property="textContent: firstName">Name</span>
                    <span h-model="^.${postProp(x => x.post.user)}" h-property="textContent: username">Handle</span>
                    <span h-model="^.${postProp(x => x.post)}" h-property="textContent: date.substring(0, 10)">Date</span>
                </div>
                <div>
                    <span h-model="^.${postProp(x => x.post)}" h-property="textContent: text" style="color: var(--color-ui-subtext); font-size: .9rem;">Post text...</span>
                </div>
            </div>
        </div>
        <div class="center" style="justify-content: space-around; padding: 0px 20px">
            <span class="icon material-symbols-outlined"
             h-model="^.${postProp(x => x.post)}" h-on="click: ${argName(x => x.this.viewPost)}(${argName(x => x.$state)})"
             h-class="icon-inactive: !${argName(x => x.this.hasComments)}(${argName(x => x.$state)})">
                comment
            </span>
            <span class="icon icon-inactive material-symbols-outlined">loop</span>
            <span class="icon material-symbols-outlined"
            h-model="^.${postProp(x => x.post)}" h-class="icon-active: this.likedPost($state)" h-on="click: this.toggleLike($state)">
                favorite
            </span>
            <span class="icon icon-inactive material-symbols-outlined">ios_share</span>
        </div>
        <div style="width:80%; margin-left: auto;"
        h-model="^" h-class="hidden: !showComments">
            <app-comment h-model="^.${postProp(x => x.post.comments)}"></app-comment>
            <div>
                <br />
                <div>
                    <textarea h-component="app-input" placeholder="Please type your post..." class="post-text"
                        h-model="^.${postProp(x => x.postInput)}">
                    </textarea>
                </div>
                <br />
                <div class="center">
                    <button h-model="^.${postProp(x => x.submitButton)}" h-component="app-button">Post</button>
                </div>
            </div>
        </div>
    </div>
</template>`;
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
    hasComments(post) {
        return post.comments.length > 0;
    }
    async toggleLike(post) {
        const user = this.#auth.user;
        const response = this.likedPost(post)
            ? await this.#api.unlikePost(user.userId, post.postId)
            : await this.#api.likePost(user.userId, post.postId);
        if (response.success) {
            const index = this.state.findIndex(x => x.post.postId === post.postId);
            this.model[index].post.likes = response.result.likes;
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
