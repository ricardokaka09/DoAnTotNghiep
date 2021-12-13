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
    listUser: [],
    detailUser: {},
    listTopUp: [],
    listTransferPoint: [],
    listNews: [],
    detailTopUp: {},
    detailTransfer: {},
    detailNews: {},
    listReward: [],
    detailReward: {},
    success: false,
    message: "",
    error: false,
    sidebarShow: "responsive",
    sidebarMinimize: false,
    listNotification: [],
    detailNotificationn: {},
  },
  getters: {
    listUser: (state) => state.listUser,
    listTopUp: (state) => state.listTopUp,
    listTransferPoint: (state) => state.listTransferPoint,
    listNews: (state) => state.listNews,
    success: (state) => state.success,
    message: (state) => state.message,
    error: (state) => state.error,
    detailTopUp: (state) => state.detailTopUp,
    detailTransfer: (state) => state.detailTransfer,
    detailNews: (state) => state.detailNews,
    detailReward: (state) => state.detailReward,
    listReward: (state) => state.listReward,
    listNotification: (state) => state.listNotification,
    detailNotification: (state) => state.detailNotification,
    detailUser: (state) => state.detailUser,
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
    getListUser({ commit }) {
      Api.requestServer1
        .get(`${Urls.LIST}/${Urls.USER}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["listUser", data.data]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createUser({ commit }, formData) {
      Api.requestServer1
        .post(`${Urls.ADMIN}/${Urls.USER}/${Urls.CREATE}`, formData)
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
    getDetailUserByID({ commit }, id) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.USER}/${Urls.DETAIL}?user_id=${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["detailUser", data.data]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUserByID({ commit }, formData) {
      Api.requestServer1
        .post(
          `${Urls.ADMIN}/${Urls.USER}/${Urls.UPDATE}/${formData.get("id")}`,
          formData
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
    deleteUser({ commit }, idDelete) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.USER}/${Urls.DELETE}/${idDelete}`)
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
    blockUser({ commit }, formData) {
      Api.requestServer1
        .post(
          `${Urls.ADMIN}/${Urls.USER}/${Urls.UPDATE_STATUS}/${formData.id}`,
          formData
        )
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["message", data.message]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.error.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getListTopUp({ commit }) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.TOPUP}/${Urls.LIST}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["listTopUp", data.data]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTopUpById({ commit }, id) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.TOPUP}/${Urls.DETAIL}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["detailTopUp", data.data]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createTopUp({ commit }, formData) {
      Api.requestServer1
        .post(`${Urls.ADMIN}/${Urls.TOPUP}/${Urls.CREATE}`, formData)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["message", data.message]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.error.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getListReward({ commit }) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.REWARD}/${Urls.LIST}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["listReward", data.data]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createReward({ commit }, formData) {
      Api.requestServer1
        .post(`${Urls.ADMIN}/${Urls.REWARD}/${Urls.CREATE}`, formData)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["message", data.message]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.message.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //call api list Transfer Point
    getListTransferPoint({ commit }) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.TRANSFERPOINT}/${Urls.LIST}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["listTransferPoint", data.data]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTransferById({ commit }, id) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.TRANSFERPOINT}/${Urls.DETAIL}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["detailTransfer", data.data[0]]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //call api News
    getListNews({ commit }) {
      Api.requestServer1
        .get(`${Urls.NEWS}/${Urls.LIST}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["listNews", data.data]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getNewsById({ commit }, id) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.NEWS}/${Urls.DETAIL}/${id}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["detailNews", data.data]);
          } else {
            commit("set", ["message", data.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createNews({ commit }, formData) {
      Api.requestServer1
        .post(`${Urls.ADMIN}/${Urls.NEWS}/${Urls.CREATE}`, formData)
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
    editNews({ commit }, formData) {
      Api.requestServer1
        .post(
          `${Urls.ADMIN}/${Urls.NEWS}/${Urls.UPDATE}/${formData.get("id")}`,
          formData
        )
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
    deleteNews({ commit }, id) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.NEWS}/${Urls.DELETE}/${id}`)
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
    //call api Notification
    getListNotification({ commit }) {
      Api.requestServer1
        .get(`${Urls.NOTIFICATION}/${Urls.LIST}`)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["listNotification", data.data]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createNotification({ commit }, formData) {
      Api.requestServer1
        .post(`${Urls.ADMIN}/${Urls.NOTIFICATION}/${Urls.CREATE}`, formData)
        .then((response) => {
          const { data } = response;
          if (data.success) {
            commit("set", ["message", data.message]);
            commit("set", ["success", true]);
          } else {
            commit("set", ["message", data.message.message]);
            commit("set", ["error", true]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateNotification({ commit }, formData) {
      Api.requestServer1
        .post(
          `${Urls.ADMIN}/${Urls.NOTIFICATION}/${Urls.UPDATE}/${formData.get(
            "id"
          )}`,
          formData
        )
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
    deleteNotis({ commit }, id) {
      Api.requestServer1
        .get(`${Urls.ADMIN}/${Urls.NOTIFICATION}/${Urls.DELETE}/${id}`)
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
  },
  modules: {},
});
