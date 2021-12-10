/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import { Api } from "../utils/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Page
    pageById: {},
    listPage: [],
    success: false,
    message: "",
    error: false,
  },
  getters: {
    // Page
    listPage: (state) => state.listPage,
    pageById: (state) => state.pageById,
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
  },
  actions: {
    //api note
    getListNote({ commit }, id) {
      Api.requestServer1
        .get(`${process.env.VUE_APP_ROOT_API}/note-content/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["listNote", data.data]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createNote({ commit }, formData) {
      Api.requestServer1
        .post(`${process.env.VUE_APP_ROOT_API}/note`, formData)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["message", data.message]);
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
    getNoteById({ commit }, id) {
      Api.requestServer1
        .get(`${process.env.VUE_APP_ROOT_API}/note/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["noteById", data.data]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateNoteById({ commit }, formUpdate) {
      Api.requestServer1
        .patch(
          `${process.env.VUE_APP_ROOT_API}/note/${formUpdate.id}`,
          formUpdate
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["message", data.message]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.error]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteNote({ commit }, id) {
      Api.requestServer1
        .delete(`${process.env.VUE_APP_ROOT_API}/note/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["success", true]);
            commit("set", ["message", data.message]);
            commit("removeItem", ["listNote", id]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //end api note
  },
  modules: {},
});
