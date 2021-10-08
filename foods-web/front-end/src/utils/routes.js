export const modules = [
    {
        path: "login",
        component: "auth/login",
        auth: false,
        layout: "auth"
    },
    {
        path: "dashboard",
        component: "master/dashboard",
        auth: true,
        layout: "master",
        user_type: 0
    },
    {
        path: "home",
        component: "default/home",
        auth: true,
        layout: "default",
        user_type: 3
    },
]