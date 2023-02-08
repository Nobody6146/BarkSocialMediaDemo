import { HydrateRoute, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";

export const LoginRoute:HydrateRoute = {
    name: "Login",
    path: "#login",
    action: async function(request:HydrateRouteRequest) {
        request.resolve()
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(request.resolve());
        //     }, 1000);
        // });
    }
}