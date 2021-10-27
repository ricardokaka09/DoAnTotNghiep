import Vue from "vue";
import Router from "vue-router";
import { Routes } from "../utils/routes";
import { Constants } from "../utils/constants";

// Layout
const LayoutAuth = () => import("@/components/auth/Layout");
const LayoutAdmin = () => import("@/components/admin/Layout");
const LayoutMaster = () => import("@/components/master/Layout");
const LayoutHome = () => import("@/components/default/Layout");
// Auth
const Login = () => import("@/views/auth/Login");
//Master
const DashBoardMaster = () => import("@/views/master/DashBoard");
//Admin
const DashBoardAdmin = () => import("@/views/admin/DashBoard");
//Home
const Home = () => import("@/views/default/Home");

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
      path: "/master",
      name: "layout master",
      redirect: `${Routes.DASHBOARD}`,
      component: LayoutMaster,
      children: [
        {
          path: `/${Routes.DASHBOARD}`,
          name: "dashboard master",
          component: DashBoardMaster,
          meta: {
            label: "dashboard master",
            requiresAuth: true,
            userType: 0,
          },
        },
      ],
    },
    {
      path: `/:shopId/${Routes.ADMIN}`,
      component: LayoutAdmin,
      children: [
        {
          path: `/:shopId/${Routes.ADMIN}`,
          name: "dashboard admin",
          component: DashBoardAdmin,
          meta: {
            label: "dashboard admin",
            requiresAuth: true,
            userType: 2,
          },
        },
      ],
    },
    {
      path: "/",
      component: LayoutHome,
      children: [
        {
          path: `${Routes.HOME}`,
          name: "home",
          component: Home,
          meta: {
            label: "home",
            userType: 3,
          },
        },
      ],
    },
    {
      path: "/",
      redirect: `${Routes.LOGIN}`,
      name: "layout auth",
      component: LayoutAuth,
      children: [
        {
          path: `:id/${Routes.LOGIN}`,
          name: "login shop",
          component: Login,
        },
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
  ];
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem(Constants.TOKEN);
    if (token === null) {
      next({
        name: "login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      const userTypeCheck = parseInt(localStorage.getItem(Constants.USER_TYPE));
      const { userType } = to.meta;

      if (from.name === Routes.LOGIN) {
        next();
      } else {
        if (userTypeCheck > userType) {
          localStorage.removeItem(Constants.TOKEN);
          localStorage.removeItem(Constants.USER_TYPE);
          next({
            name: "login",
            params: { nextUrl: to.fullPath },
          });
        } else {
          next();
        }
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem(Constants.TOKEN) == null) {
      next();
    } else {
      next();
    }
  } else {
    // eslint-disable-next-line no-inner-declarations
    function isValid() {
      if (to.name !== null) {
        return true;
      } else {
        return false;
      }
    }
    if (!isValid(to.params)) {
      next("/pages/404");
    } else {
      next();
    }
  }

  // eslint-disable-next-line no-unused-vars
  router.afterEach((to, from) => {
    Vue.nextTick(() => {
      document.title = to.meta.title || "CDEA";
    });
  });
});

export default router;
