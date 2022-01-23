import Vue from "vue";
import Vuex from "vuex";
import { Api } from "../utils/http-common";
import { Urls } from "../utils/urls";
Vue.use(Vuex);

// const state = {
//   sidebarShow: "responsive",
//   sidebarMinimize: false,
// };

// const mutations = {
//   toggleSidebarDesktop(state) {
//     const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
//     state.sidebarShow = sidebarOpened ? false : "responsive";
//   },
//   toggleSidebarMobile(state) {
//     const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
//     state.sidebarShow = sidebarClosed ? true : "responsive";
//   },
//   set(state, [variable, value]) {
//     state[variable] = value;
//   },
// };

export default new Vuex.Store({
  state: {
    success: false,
    message: "",
    error: false,
    sidebarShow: "responsive",
    sidebarMinimize: false,
    listCategory: [],
    categoryByID: {},
    listSubCategory: [],
    listProduct: [],
  },
  getters: {
    success: (state) => state.success,
    message: (state) => state.message,
    error: (state) => state.error,
    //Flash Food
    listCategory: (state) => state.listCategory,
    categoryByID: (state) => state.categoryByID,
    listSubCategory: (state) => state.listSubCategory,
    listProduct: (state) => state.listProduct,
  },
  mutations: {
    set(state, [variable, value]) {
      state[variable] = value;
    },
    removeItem(state, [variable, value]) {
      state[variable] = state[variable].filter(function (item) {
        return item.id !== value;
      });
    },
    toggleSidebarDesktop(state) {
      const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
      state.sidebarShow = sidebarOpened ? false : "responsive";
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
      state.sidebarShow = sidebarClosed ? true : "responsive";
    },
    // eslint-disable-next-line no-dupe-keys
    set(state, [variable, value]) {
      state[variable] = value;
    },
  },
  actions: {
    //Cate
    getListCategory({ commit }) {
      Api.requestServer1
        .get(`${Urls.CATEGORIES}`)
        .then((response) => {
          const { data } = response;
          commit("set", ["listCategory", data.list]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createCategory({ commit }, formData) {
      Api.requestServer1
        .post(`${Urls.CATEGORIES}`, formData)
        .then((response) => {
          const { data } = response;
          if (data.statusCode == 401) {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          } else {
            commit("set", ["message", "Create Success"]);
            commit("set", ["success", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCategoryByID({ commit }, id) {
      Api.requestServer1
        .get(`${Urls.CATEGORIES}?categoryID=${id}`)
        .then((response) => {
          const { data } = response;
          commit("set", ["categoryByID", data.list[0]]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCategoryId({ commit }, formData) {
      Api.requestServer1
        .put(`${Urls.CATEGORIES}/${formData.categoryID}`, formData)
        .then((response) => {
          const { data } = response;
          if (data === true) {
            commit("set", ["message", "Đã update thành công"]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCategoryByID({ commit }, id) {
      Api.requestServer1
        .delete(`${Urls.CATEGORIES}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data) {
            commit("set", ["message", "Xoá thành công"]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //SubCate
    getListSubCategory({ commit }) {
      Api.requestServer1
        .get(`${Urls.SUBCATEGORIES}`)
        .then((response) => {
          const { data } = response;
          commit("set", ["listSubCategory", data.list]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createSubCategory({ commit }, formData) {
      Api.requestServer1
        .post(`${Urls.SUBCATEGORIES}`, formData)
        .then((response) => {
          const { data } = response;
          if (data.statusCode == 401) {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          } else {
            commit("set", ["message", "Create Success"]);
            commit("set", ["success", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateSubCategoryId({ commit }, formData) {
      Api.requestServer1
        .put(`${Urls.SUBCATEGORIES}/${formData.subCategoryID}`, formData)
        .then((response) => {
          const { data } = response;
          if (data === true) {
            commit("set", ["message", "Đã update thành công"]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteSubCategoryByID({ commit }, id) {
      Api.requestServer1
        .delete(`${Urls.SUBCATEGORIES}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data) {
            commit("set", ["message", "Xoá thành công"]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Product
    getListProduct({ commit }) {
      Api.requestServer1
        .get(`${Urls.PRODUCTS}`)
        .then((response) => {
          const { data } = response;
          commit("set", ["listProduct", data.list]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createProduct({ commit }, formData) {
      Api.requestServer1
        .post(`${Urls.PRODUCTS}`, formData)
        .then((response) => {
          const { data } = response;
          // eslint-disable-next-line no-debugger
          debugger;
          if (data.statusCode == 401) {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          } else {
            commit("set", ["message", "Create Success"]);
            commit("set", ["success", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deteleProductByID({ commit }, id) {
      Api.requestServer1
        .delete(`${Urls.PRODUCTS}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data) {
            commit("set", ["message", "Xoá thành công"]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
