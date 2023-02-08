import { HydrateRoute, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";

export const SignInRoute:HydrateRoute = {
    name: "SignIn",
    path: "#sign-in",
    action: async function(request:HydrateRouteRequest) {
        return request.resolve();
    }
}