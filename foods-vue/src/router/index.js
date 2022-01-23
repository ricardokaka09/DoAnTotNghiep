import Vue from "vue";
import Router from "vue-router";
import { Routes } from "../utils/routes";
// import { Constants } from "../utils/constants";

// Layout
const LayoutAuth = () => import("@/components/auth/Layout");
const LayoutAdmin = () => import("@/components/admin/Layout");
const LayoutDefault = () => import("@/components/default/Layout");
const LayoutStore = () => import("@/components/store/Layout");
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
const LoginUser = () => import("@/views/default/Login");
const Cart = () => import("@/components/default/Cart");
const ListProduct = () => import("@/components/default/ListProduct");
const Checkout = () => import("@/components/default/Checkout");
const Contact = () => import("@/components/default/Contact");
const BlogPage = () => import("@/components/default/BlogPage");
const BlogDetail = () => import("@/components/default/BlogDetail");
const ProductDetail = () => import("@/components/default/ProductDetail");

//Store
const DashboardStore = () => import("@/views/store/Dashboard");
const ListCategoryStore = () => import("@/views/store/ListCategory");
const CreateCategory = () => import("@/views/store/CreateCategory");
const EditCategory = () => import("@/views/store/EditCategory");
const ListSubCategoryStore = () => import("@/views/store/ListSubCategory");
const CreateSubCategory = () => import("@/views/store/CreateSubCategory");
const EditSubCategory = () => import("@/views/store/EditSubCategory");
const ListProductStore = () => import("@/views/store/ListProduct");
const CreateProduct = () => import("@/views/store/CreateProduct");

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
          name: "List Category Admin",
          component: ListCategory,
          meta: {
            label: "List Category Admin",
            requiresAuth: true,
            role: 0,
          },
        },
      ],
    },
    {
      path: `/${Routes.STORE}`,
      name: "Store",
      redirect: `/${Routes.STORE}/${Routes.DASHBOARD}`,
      component: LayoutStore,
      children: [
        {
          path: `/${Routes.STORE}/${Routes.DASHBOARD}`,
          name: "DashboardStore",
          component: DashboardStore,
          meta: {
            label: "DashboardStore",
            requiresAuth: true,
            role: 2,
          },
        },
        //Cate
        {
          path: `/${Routes.STORE}/${Routes.CATEGORY}`,
          name: "List Category",
          component: ListCategoryStore,
          meta: {
            label: "List Category",
            requiresAuth: true,
            role: 2,
          },
        },
        {
          path: `/${Routes.STORE}/${Routes.CATEGORY}/${Routes.CREATE}`,
          name: "Create Category",
          component: CreateCategory,
          meta: {
            label: "Create Category",
            requiresAuth: true,
            role: 2,
          },
        },
        {
          path: `/${Routes.STORE}/${Routes.CATEGORY}/${Routes.EDIT}/:id`,
          name: "edit category",
          component: EditCategory,
          meta: {
            label: "edit category",
            requiresAuth: true,
            role: 2,
          },
        },
        //SubCate
        {
          path: `/${Routes.STORE}/${Routes.CATEGORY}/${Routes.SUB}`,
          name: "List SubCategory",
          component: ListSubCategoryStore,
          meta: {
            label: "List SubCategory",
            requiresAuth: true,
            role: 2,
          },
        },
        {
          path: `/${Routes.STORE}/${Routes.CATEGORY}/${Routes.SUB}/${Routes.CREATE}`,
          name: "Create SubCategory",
          component: CreateSubCategory,
          meta: {
            label: "Create SubCategory",
            requiresAuth: true,
            role: 2,
          },
        },
        {
          path: `/${Routes.STORE}/${Routes.CATEGORY}/${Routes.SUB}/${Routes.EDIT}/:id`,
          name: "Edit SubCategory",
          component: EditSubCategory,
          meta: {
            label: "Edit SubCategory",
            requiresAuth: true,
            role: 2,
          },
        },
        //Product
        {
          path: `/${Routes.STORE}/${Routes.PRODUCT}`,
          name: "List Product Store",
          component: ListProductStore,
          meta: {
            label: "List Product Store",
            requiresAuth: true,
            role: 2,
          },
        },
        {
          path: `/${Routes.STORE}/${Routes.PRODUCT}/${Routes.CREATE}`,
          name: "Create Product",
          component: CreateProduct,
          meta: {
            label: "Create Product",
            requiresAuth: true,
            role: 2,
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
          path: `${Routes.LOGIN}`,
          name: "login user",
          component: LoginUser,
        },
        {
          path: `${Routes.REGISTER}/${Routes.USER}`,
          name: "register user",
          component: RegisterUser,
        },
        {
          path: `${Routes.CART}`,
          name: "cart",
          component: Cart,
        },
        {
          path: `${Routes.PRODUCT}`,
          name: "list product",
          component: ListProduct,
        },
        {
          path: `${Routes.CHECKOUT}`,
          name: "checkout",
          component: Checkout,
        },
        {
          path: `${Routes.CONTACT}`,
          name: "contact",
          component: Contact,
        },
        {
          path: `${Routes.BLOG}`,
          name: "blog",
          component: BlogPage,
        },
        {
          path: `${Routes.BLOG}/${Routes.DETAIL}/:id`,
          name: "blog detail",
          component: BlogDetail,
        },
        {
          path: `${Routes.PRODUCT}/${Routes.DETAIL}/:id`,
          name: "product detail",
          component: ProductDetail,
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
      redirect: `/${Routes.ADMIN}/${Routes.LOGIN}`,
      name: "layout auth",
      component: LayoutAuth,
      children: [
        {
          path: `${Routes.ADMIN}/${Routes.LOGIN}`,
          name: "login admin",
          component: Login,
        },
        {
          path: `register/verify`,
          name: "register user",
          component: ActiveAccount,
        },
        {
          path: `${Routes.PAGES}/404`,
          name: "page404",
          component: Page404,
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
