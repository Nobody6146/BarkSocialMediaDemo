import { HydrateRoute, HydrateRouteMatch, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";
import { PostDto } from "../../models/dtos.js";
import { ApiService } from "../../services/api/service.js";

export let PostDetailRouteModelPath = "postDetail";

export interface PostDetailRouteState {
    post:PostDto;
}

export interface PostDetailRouteParameters {
    id:string;
}

export function PostDetailRoutePathBuilder(id:string) {
    return PostDetailRoute.path.replace(/:id/, id);
}

export const PostDetailRoute:HydrateRoute = {
    name: "PostDetail",
    path: "#post-detail/:id",
    action: async function(request:HydrateRouteRequest, match:HydrateRouteMatch) {
        const id = (match.params as PostDetailRouteParameters).id;
        const api = request.hydrate.dependency(ApiService, this).instance;
        const response = await api.posts(id);
        if(!response.success)
            throw new Error(response.error);
        const state:PostDetailRouteState = {
            post: response.result[0]
        };
        request.hydrate.bind(PostDetailRouteModelPath, state);
        request.state = state;
        return request.resolve();
    }
}