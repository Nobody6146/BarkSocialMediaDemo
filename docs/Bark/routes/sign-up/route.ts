import { HydrateRoute, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";

export const SignUpRoute:HydrateRoute = {
    name: "SignUp",
    path: "#sign-up",
    action: async function(request:HydrateRouteRequest) {
        return request.resolve();
    }
}