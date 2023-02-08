import { LoginRoute } from "../../routes/login/route.js";
import { AuthService } from "../../services/auth/service.js";
export const AuthenticatorMiddleware = {
    name: "Authenticator",
    path: "",
    action: async function (request) {
        if (!request.hydrate.dependency(AuthService).instance.isAuthenticated)
            request.redirect(LoginRoute.path);
    }
};
