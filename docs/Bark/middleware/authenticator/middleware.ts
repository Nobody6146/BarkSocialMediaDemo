import { HydrateRoute, HydrateRouteRequest } from "../../lib/hydrate/hydrate.js";
import { LoginRoute } from "../../routes/login/route.js";
import { AuthService } from "../../services/auth/service.js";

export const AuthenticatorMiddleware:HydrateRoute = {
    name: "Authenticator",
    path: "",
    action: async function(request:HydrateRouteRequest) {
        if(!request.hydrate.dependency(AuthService).instance.isAuthenticated)
            request.redirect(LoginRoute.path);
    }
}