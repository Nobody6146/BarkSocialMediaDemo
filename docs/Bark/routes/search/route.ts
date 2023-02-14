import { HydrateRoute, HydrateRouteMatch, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";
import { PostDto } from "../../models/dtos.js";
import { ApiService } from "../../services/api/service.js";

export interface SearchRouteQuery {
    query:string;
}

export interface SearchRouteState {
    query:string;
    posts:PostDto[];
}

// lets pass in the model name from the component and use the scaffold to keep it in sync?
//then import into route file

export const SearchRoute:HydrateRoute = {
    name: "Search",
    path: "#search",
    action: async function(request:HydrateRouteRequest, match:HydrateRouteMatch) {
        const api = request.hydrate.dependency(ApiService, this).instance;
        const query = (match.query as SearchRouteQuery).query?.toLocaleLowerCase() ?? "";
        const filter = function(post:PostDto) {
            const name = `${post.user.firstName} ${post.user.lastName}`.trim().toLocaleLowerCase();
            if(name !== "" && name.toLocaleLowerCase().includes(query))
                return true;
            if(post.user.username.toLocaleLowerCase().includes(query))
                return true;
            if(post.text.toLocaleLowerCase().includes(query))
                return true;
            return false;
        }
        const postResponse = await api.posts();
        if(!postResponse.success)
            throw new Error(postResponse.error);
        const state:SearchRouteState = {
            query: query,
            posts: query === "" ? [] : postResponse.result.filter(x => filter(x))
        };
        request.state = state;
        return request.resolve();
    }
}