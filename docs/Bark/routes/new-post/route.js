export const NewPostRoute = {
    name: "NewPost",
    path: "#new-post",
    action: async function (request, match) {
        return request.resolve();
    }
};
