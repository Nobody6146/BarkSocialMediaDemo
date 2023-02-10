import { HomeRoute } from "./routes/home/route.js";
import { NotFoundRoute } from "./routes/notfound/route.js";
import { LoginRoute } from "./routes/login/route.js";
import { AuthenticatorMiddleware } from "./middleware/authenticator/middleware.js";
import { SignInRoute } from "./routes/sign-in/route.js";
import { SignUpRoute } from "./routes/sign-up/route.js";
import { SearchRoute } from "./routes/search/route.js";
export const AppRoutes = [
    LoginRoute,
    SignInRoute,
    SignUpRoute,
    AuthenticatorMiddleware,
    HomeRoute,
    SearchRoute
].concat(NotFoundRoute);
