import { ApiService } from "../../services/api/service.js";
export let SearchRouteModelPath = "postSearch";
// lets pass in the model name from the component and use the scaffold to keep it in sync?
//then import into route file
export const SearchRoute = {
    name: "Search",
    path: "#search",
    action: async function (request, match) {
        console.log("searching");
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
        const state = {
            query: query,
            posts: query === "" ? [] : (await api.posts()).filter(x => filter(x))
        };
        request.hydrate.bind(SearchRouteModelPath, state);
        return request.resolve();
    }
};
