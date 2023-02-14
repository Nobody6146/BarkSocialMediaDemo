import { ApiService } from "../../services/api/service.js";
export const HomeRoute = {
    name: "Home",
    path: "#home",
    action: async (request) => {
        const api = request.hydrate.dependency(ApiService, this).instance;
        const repsonse = await api.posts();
        if (!repsonse.success)
            throw new Error(repsonse.error);
        const state = {
            posts: repsonse.result
        };
        request.state = state;
        request.resolve();
    }
};
