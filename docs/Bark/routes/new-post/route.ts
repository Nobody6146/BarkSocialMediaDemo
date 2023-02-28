import { HydrateRoute, HydrateRouteMatch, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";

export const NewPostRoute:HydrateRoute = {
    name: "NewPost",
    path: "#new-post",
    action: async function(request:HydrateRouteRequest, match:HydrateRouteMatch) {
        return request.resolve();
    }
}