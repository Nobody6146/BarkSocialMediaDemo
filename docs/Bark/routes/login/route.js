export const LoginRoute = {
    name: "Login",
    path: "#login",
    action: async function (request) {
        request.resolve();
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve(request.resolve());
        //     }, 1000);
        // });
    }
};
