import { HydrateComponent, HydrateEventDetails, HydrateFieldExpressionArgs } from "../../lib/hydrate/hydrate.js";
import { CommentDto, UserDto } from "../../models/dtos.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";

//****** Boiler Plate Code to dynamically get names of object properties *******/
interface ComponentFieldExpressionArgs extends HydrateFieldExpressionArgs<CommentComponentState, CommentComponent> {
    this:CommentComponent;
}
function argName(exp: (x:ComponentFieldExpressionArgs) => any):string {
    return name(exp);
}
function propName(exp: (x:CommentComponentState) => any):string{
    return name(exp);
}
function name(exp: (...any) => any):string {
    return exp.toString().match(/\=\>\s+[^\.]+\.(.+)/)?.[1];
}
function commentProp(exp: (x:CommentDto) => any):string{
    return name(exp);
}
function userProp(exp: (x:UserDto) => any):string{
    return name(exp);
}

//******* HTML Template *******/
export let CommentComponentTemplate = `<template h-model>
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
    </style>
    <div style="box-sizing: border-box; display: flex; flex-direction: column; width: 100%; gap: 20px; border-bottom: 1px solid var(--color-compliment); padding: 10px">
        <div style="display: flex; width: 100%">
            <div style="box-sizing: border-box; max-width: 20%; margin-right: 20px;">
                <img h-model="^.${commentProp(x => x.user)}" h-attribute="src: ${userProp(x => x.image)}" style="width: 100%;">
            </div>
            <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; gap: 10px;">
                    <span h-model="^.${commentProp(x => x.user)}" h-property="textContent: ${userProp(x => x.firstName)}">Name</span>
                    <span h-model="^.${commentProp(x => x.user)}" h-property="textContent: ${userProp(x => x.username)}">Handle</span>
                    <span h-model="^" h-property="textContent: ${commentProp(x => x.date.substring(0, 10))}">Date</span>
                </div>
                <div>
                    <span h-model="^" h-property="textContent: ${commentProp(x => x.text)}" style="color: var(--color-ui-subtext); font-size: .9rem;">Comment text...</span>
                </div>
            </div>
        </div>
        <div class="center" style="justify-content: space-around; padding: 0px 20px">
            <span class="icon material-symbols-outlined"
            h-model="^" h-class="icon-active: ${argName(x => x.this.likedComment)}(${argName(x => x.$state)})"
             h-on="click: ${argName(x => x.this.toggleLike)}(${argName(x => x.$state)})">
                favorite
            </span>
            <span class="icon icon-inactive material-symbols-outlined">ios_share</span>
        </div>
    </div>
</template>`;

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