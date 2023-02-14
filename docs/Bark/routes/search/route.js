import { ApiService } from "../../services/api/service.js";
// lets pass in the model name from the component and use the scaffold to keep it in sync?
//then import into route file
export const SearchRoute = {
    name: "Search",
    path: "#search",
    action: async function (request, match) {
        const api = request.hydrate.dependency(ApiService, this).instance;
        const query = match.query.query?.toLocaleLowerCase() ?? "";
        const filter = function (post) {
            const name = `${post.user.firstName} ${post.user.lastName}`.trim().toLocaleLowerCase();
            if (name !== "" && name.toLocaleLowerCase().includes(query))
                return true;
            if (post.user.username.toLocaleLowerCase().includes(query))
                return true;
            if (post.text.toLocaleLowerCase().includes(query))
                return true;
            return false;
        };
        const postResponse = await api.posts();
        if (!postResponse.success)
            throw new Error(postResponse.error);
        const state = {
            query: query,
            posts: query === "" ? [] : postResponse.result.filter(x => filter(x))
        };
        request.state = state;
        return request.resolve();
    }
};
