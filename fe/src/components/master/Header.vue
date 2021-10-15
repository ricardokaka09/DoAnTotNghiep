<template>
  <div class="header d-flex justify-content-end">
    <div class="avatar d-flex align-items-center px-4">
      <img :src="logo" alt="avatar" v-on:click.prevent="setShowSettings()" />
    </div>

    <div class="setting-user" v-if="showSetting">
      <div class="logout">
        <b-button variant="light" v-on:click="logoutBtn()">Logout</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/img/avatar.png";
import { mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      logo: logo,
      showSetting: false,
    };
  },
  methods: {
    ...mapActions({ logout: "logout" }),
    setShowSettings() {
      this.showSetting = !this.showSetting;
    },
    logoutBtn() {
      localStorage.clear();
      this.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
