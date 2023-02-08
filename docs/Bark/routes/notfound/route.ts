import { HydrateRoute, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";
import { HomeRoute } from "../home/route.js";

export const NotFoundRoute:HydrateRoute = {
    name: "NotFound",
    path: "",
    action: async (request:HydrateRouteRequest) => request.redirect(HomeRoute.path)
}