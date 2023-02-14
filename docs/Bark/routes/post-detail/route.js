import { ApiService } from "../../services/api/service.js";
export let PostDetailRouteModelPath = "postDetail";
export function PostDetailRoutePathBuilder(id) {
    return PostDetailRoute.path.replace(/:id/, id);
}
export const PostDetailRoute = {
    name: "PostDetail",
    path: "#post-detail/:id",
    action: async function (request, match) {
        const id = match.params.id;
        const api = request.hydrate.dependency(ApiService, this).instance;
        const response = await api.posts(id);
        if (!response.success)
            throw new Error(response.error);
        const state = {
            post: response.result[0]
        };
        request.hydrate.bind(PostDetailRouteModelPath, state);
        request.state = state;
        return request.resolve();
    }
};
