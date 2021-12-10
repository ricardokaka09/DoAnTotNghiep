import Vue from "vue";
import Router from "vue-router";
import { Routes } from "../utils/routes";
// import { Constants } from "../utils/constants";

// Layout
const LayoutAuth = () => import("@/components/auth/Layout");
const LayoutAdmin = () => import("@/components/admin/Layout");
// Auth
const Login = () => import("@/views/auth/Login");

// //User Admin
// const ListUser = () => import("@/views/admin/ListUser");
// const CreateUser = () => import("@/views/admin/CreateUser");
// const EditUser = () => import("@/views/admin/EditUser");
// const ListTopup = () => import("@/views/admin/ListTopup");
// const ListTransfer = () => import("@/views/admin/ListTransfer");
// const ListReward = () => import("@/views/admin/ListReward");
// const ListNews = () => import("@/views/admin/ListNews");
// const ListNotification = () => import("@/views/admin/ListNotification");
// const CreateTopup = () => import("@/views/admin/CreateTopUp");
// const CreateReward = () => import("@/views/admin/CreateReward");

// Views - Pages
// const Page404 = () => import("@/views/example/pages/Page404");
// const Page500 = () => import("@/views/example/pages/Page500");
// const Register = () => import("@/views/example/pages/Register");
// const LoginExp = () => import("@/views/example/pages/Login");

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
      name: "Trang chủ",
      redirect: `/${Routes.ADMIN}/${Routes.USER}`,
      component: LayoutAdmin,
      children: [
        // {
        //   path: `/${Routes.ADMIN}/${Routes.USER}`,
        //   name: "List User",
        //   component: ListUser,
        //   meta: {
        //     label: "Người dùng",
        //     requiresAuth: true,
        //     role: 0,
        //   },
        // },
        // {
        //   path: `/${Routes.ADMIN}/${Routes.USER}/${Routes.CREATE}`,
        //   name: "Create User",
        //   component: CreateUser,
        // },
        // {
        //   path: `/${Routes.ADMIN}/${Routes.USER}/${Routes.EDIT}/:id`,
        //   name: "Edit User",
        //   component: EditUser,
        // },
        // {
        //   path: `${Routes.TOPUP}`,
        //   name: "Top Up",
        //   component: ListTopup,
        //   meta: {
        //     label: "Nạp tiền",
        //     requiresAuth: true,
        //     role: 0,
        //   },
        // },
        // {
        //   path: "transfer",
        //   name: "Transfer Point",
        //   component: ListTransfer,
        //   meta: {
        //     label: "Chuyển tiền",
        //     requiresAuth: true,
        //     role: 0,
        //   },
        // },
        // {
        //   path: `${Routes.REWARD}`,
        //   name: "Reward",
        //   component: ListReward,
        //   meta: {
        //     label: "Thưởng",
        //     requiresAuth: true,
        //     role: 0,
        //   },
        // },
        // {
        //   path: "Notification",
        //   name: "Notification",
        //   component: ListNotification,
        //   meta: {
        //     label: "Thông báo",
        //     requiresAuth: true,
        //     role: 0,
        //   },
        // },
        // {
        //   path: "news",
        //   name: "News",
        //   component: ListNews,
        //   meta: {
        //     label: "Tin tức",
        //     requiresAuth: true,
        //     role: 0,
        //   },
        // },
        // {
        //   path: `${Routes.TOPUP}/${Routes.CREATE}`,
        //   name: "create topup",
        //   component: CreateTopup,
        //   meta: {
        //     label: "Nạp tiền",
        //     requiresAuth: true,
        //     role: 0,
        //   },
        // },
        // {
        //   path: `${Routes.REWARD}/${Routes.CREATE}`,
        //   name: "create reward",
        //   component: CreateReward,
        //   meta: {
        //     label: "Tạo Thưởng",
        //     requiresAuth: true,
        //     role: 0,
        //   },
        // },
      ],
    },
    {
      path: "/",
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
        // {
        //   path: "404",
        //   name: "Page404",
        //   component: Page404,
        // },
        // {
        //   path: "500",
        //   name: "Page500",
        //   component: Page500,
        // },
        // {
        //   path: "login",
        //   name: "Login",
        //   component: LoginExp,
        // },
        // {
        //   path: "register",
        //   name: "Register",
        //   component: Register,
        // },
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
//       document.title = to.meta.title || "Flash Buy";
//     });
//   });
// });

export default router;
