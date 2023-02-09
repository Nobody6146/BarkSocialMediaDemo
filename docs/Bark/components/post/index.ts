import { HydrateComponent, HydrateEventDetails } from "../../lib/hydrate/hydrate.js";
import { PostDto } from "../../models/dtos.js";

export type PostComponentState = PostDto[];

export class PostComponent extends HydrateComponent<PostComponentState> {

    onInit(eventDetails:HydrateEventDetails):void {
        console.log("Post");
    }

    onPreRender(eventDetails:HydrateEventDetails):void {

    }

    onPostRender(eventDetails:HydrateEventDetails):void {

    }

    onDestroy():void {

    }
}