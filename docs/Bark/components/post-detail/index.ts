import { HydrateComponent, HydrateEventDetails, HydrateModelChange, HydrateModelSubscription, HydrateRouteEventDetails } from "../../lib/hydrate/hydrate.js";
import { PostDto } from "../../models/dtos.js";
import { PostDetailRouteModelPath, PostDetailRouteState } from "../../routes/post-detail/route.js";
import { PostComponentState } from "../post/index.js";

export interface PostDetailComponentState {
    posts:PostComponentState;
}

export class PostDetailComponent extends HydrateComponent<PostDetailComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        if(eventDetails.type === "routing.resolve")
        {
            const routeRequest = (eventDetails as HydrateRouteEventDetails).request;
            const state = routeRequest.state as PostDetailRouteState;
            this.model = {
                posts: [
                    {
                        post:state.post,
                        showComments:true
                    }
                ]
            }
        }
    }

    onPreRender(eventDetails:HydrateEventDetails):void {
        
    }

    onPostRender(eventDetails:HydrateEventDetails):void {
        
    }

    onDestroy():void {
        
    }
}