import Vue from "vue";
import Router from "vue-router";
import { Routes } from "../utils/routes";
// import { Constants } from "../utils/constants";

// Layout
const LayoutAuth = () => import("@/components/auth/Layout");
const LayoutAdmin = () => import("@/components/admin/Layout");
const LayoutDefault = () => import("@/components/default/Layout");
const LayoutStore = () => import("@/components/default/Layout");
// Auth
const Login = () => import("@/views/auth/Login");
const RegisterUser = () => import("@/views/auth/RegisterUser");

//User Admin
const ListCategory = () => import("@/views/admin/ListCategory");

// Views - Pages
const Page404 = () => import("@/views/example/pages/Page404");
const Page500 = () => import("@/views/example/pages/Page500");
const Register = () => import("@/views/example/pages/Register");
const LoginExp = () => import("@/views/example/pages/Login");

// Home
const Home = () => import("@/views/default/Home");
const ActiveAccount = () => import("@/views/default/ActiveAccount");
const RegisterStore = () => import("@/views/default/RegisterStore");

Vue.use(Router);
let router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: `/${Routes.ADMIN}`,
      name: "dashboard admin",
      redirect: `/${Routes.ADMIN}/${Routes.CATEGORY}`,
      component: LayoutAdmin,
      children: [
        {
          path: `/${Routes.ADMIN}/${Routes.CATEGORY}`,
          name: "List Category",
          component: ListCategory,
          meta: {
            label: "Category",
            requiresAuth: true,
            role: 0,
          },
        },
      ],
    },
    {
      path: `/${Routes.STORE}`,
      name: "dashboard store",
      redirect: `/${Routes.STORE}/${Routes.CATEGORY}`,
      component: LayoutStore,
      children: [
        {
          path: `/${Routes.STORE}/${Routes.CATEGORY}`,
          name: "List Category",
          component: ListCategory,
          meta: {
            label: "Category",
            requiresAuth: true,
            role: 1,
          },
        },
      ],
    },
    {
      path: `/`,
      redirect: `/${Routes.HOME}`,
      name: "layout default",
      component: LayoutDefault,
      children: [
        {
          path: `${Routes.HOME}`,
          name: "home",
          component: Home,
        },
        {
          path: `${Routes.REGISTER}/${Routes.STORE}`,
          name: "register store",
          component: RegisterStore,
        },
        {
          path: `${Routes.PAGES}/404`,
          name: "page404",
          component: Login,
        },
      ],
    },
    {
      path: `/`,
      redirect: `/${Routes.LOGIN}`,
      name: "layout auth",
      component: LayoutAuth,
      children: [
        {
          path: `${Routes.LOGIN}`,
          name: "login",
          component: Login,
        },
        {
          path: `${Routes.REGISTER}/${Routes.USER}`,
          name: "register user",
          component: RegisterUser,
        },
        {
          path: `register/verify`,
          name: "register user",
          component: ActiveAccount,
        },
        {
          path: `${Routes.PAGES}/404`,
          name: "page404",
          component: Login,
        },
      ],
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
        {
          path: "login",
          name: "Login",
          component: LoginExp,
        },
        {
          path: "register",
          name: "Register",
          component: Register,
        },
      ],
    },
  ];
}

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     const token = localStorage.getItem(Constants.TOKEN);
//     if (token === null) {
//       next({
//         name: "login",
//         params: { nextUrl: to.fullPath },
//       });
//     } else {
//       const roleCheck = parseInt(localStorage.getItem(Constants.ROLE));
//       const { role } = to.meta;
//       if (from.name === Routes.LOGIN) {
//         next();
//       } else {
//         if (roleCheck > role) {
//           localStorage.removeItem(Constants.TOKEN);
//           localStorage.removeItem(Constants.ROLE);
//           next({
//             name: "login",
//             params: { nextUrl: to.fullPath },
//           });
//         } else {
//           next();
//         }
//       }
//     }
//   } else if (to.matched.some((record) => record.meta.guest)) {
//     if (localStorage.getItem(Constants.TOKEN) == null) {
//       next();
//     } else {
//       next();
//     }
//   } else {
//     // eslint-disable-next-line no-inner-declarations
//     function isValid() {
//       if (to.name !== null) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//     if (!isValid(to.params)) {
//       next("/pages/404");
//     } else {
//       next();
//     }
//   }

//   // eslint-disable-next-line no-unused-vars
//   router.afterEach((to, from) => {
//     Vue.nextTick(() => {
//       document.title = to.meta.title || "Paracel Loyalty";
//     });
//   });
// });

export default router;
