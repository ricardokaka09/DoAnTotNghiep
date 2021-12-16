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
  },
  getters: {
    success: (state) => state.success,
    message: (state) => state.message,
    error: (state) => state.error,
    //Flash Food
    listCategory: (state) => state.listCategory,
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
    getListCategory({ commit }) {
      Api.requestServer1
        .get(`${Urls.CATEGORIES}`)
        .then((response) => {
          const { data } = response;
          commit("set", ["listCategory", data.list]);
          console.log(data.list);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
