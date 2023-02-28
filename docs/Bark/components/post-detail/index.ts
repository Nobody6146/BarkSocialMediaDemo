import { HydrateComponent, HydrateEventDetails, HydrateModelChange, HydrateModelSubscription, HydrateRouteEventDetails } from "../../lib/hydrate/hydrate.js";
import { PostDto } from "../../models/dtos.js";
import { PostDetailRouteModelPath, PostDetailRouteState } from "../../routes/post-detail/route.js";
import { ApiService } from "../../services/api/service.js";
import { AuthService } from "../../services/auth/service.js";
import { LoggerService } from "../../services/logger/service.js";
import { PostComponentState } from "../post/index.js";

export interface PostDetailComponentState {
    posts:PostComponentState;
}

export class PostDetailComponent extends HydrateComponent<PostDetailComponentState> {

    #api:ApiService;
    #auth:AuthService;
    #logger:LoggerService;
    #commentSubscription:HydrateModelSubscription<string>;

    onInit(eventDetails:HydrateEventDetails):void {
        this.#api = this.dependency(ApiService);
        this.#auth = this.dependency(AuthService);
        this.#logger = this.dependency(LoggerService);

        if(eventDetails.type === "routing.resolve")
        {
            const component = this;
            const routeRequest = (eventDetails as HydrateRouteEventDetails).request;
            const state = routeRequest.state as PostDetailRouteState;
            this.model = {
                posts: [
                    {
                        post:state.post,
                        showComments:true,
                        postInput: {
                            valid: true,
                            value: ""
                        },
                        submitButton: { 
                            valid: false,
                            click: function() {
                                component.saveComment(component.#auth.user.userId, component.state.posts[0].post.postId, component.state.posts[0].postInput.value);
                            }
                        }
                    }
                ]
            }
        }

        this.#commentSubscription = this.hydrate.subscribe(this.hydrate.path(this.model.posts[0].postInput) + ".value", ((change:HydrateModelChange<string>) => {
            this.validateCommentForm(change.state);
        }).bind(this));
    }

    onPreRender(eventDetails:HydrateEventDetails):void {
        
    }

    onPostRender(eventDetails:HydrateEventDetails):void {
        
    }

    onDestroy():void {
        this.#disposeSubscriptions();
    }

    #disposeSubscriptions() {
        this.#commentSubscription.unsubscribe();
    }

    validateCommentForm(text:string) {
        this.model.posts[0].submitButton.valid = text.trim().length > 0;
    }

    async saveComment(userId:string, postId:string, text:string):Promise<void> {
        const repsonse = await this.#api.writeComment(userId, postId, text);
        if(!repsonse.success)
        {
            this.#logger.error(repsonse.error);
            return;
        }
        this.model.posts[0].post.comments = repsonse.result.comments;
    }
}