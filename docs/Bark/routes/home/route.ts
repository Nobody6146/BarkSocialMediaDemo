import { HydrateRoute, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";
import { PostDto } from "../../models/dtos.js";
import { ApiService } from "../../services/api/service.js";

export interface HomeRouteState {
    posts:PostDto[];
}

export const HomeRoute:HydrateRoute = {
    name: "Home",
    path: "#home",
    action: async (request:HydrateRouteRequest) => {
        const api = request.hydrate.dependency(ApiService, this).instance;
        const repsonse = await api.posts();
        if(!repsonse.success)
            throw new Error(repsonse.error);
        const state:HomeRouteState = {
            posts: repsonse.result.sort((x, y) => x.date > y.date ? -1 : 1)
        };
        request.state = state;
        request.resolve();
    }
}