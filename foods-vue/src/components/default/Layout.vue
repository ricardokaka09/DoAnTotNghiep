<template>
  <div class="layout-default">
    <Header />
    <div class="content">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import { Constants } from "../../utils/constants.js";
import Header from "./Header";
import Footer from "./Footer";
export default {
  name: "Layout",
  components: {
    Header,
    Footer,
  },
  created() {
    const token = localStorage.getItem(Constants.TOKEN);
    if (token) {
      const role = localStorage.getItem(Constants.ROLE);
      if (parseInt(role) === 2) {
        this.$router.push({ name: "DashboardStore" });
      } else if (parseInt(role) === 0) {
        this.$router.push({ name: "dashboard admin" });
      } else if (parseInt(role) === 3) {
        this.$router.push({ name: "home" });
      }
    }
  },
};
</script>

<style lang="scss">
.content {
  background: white;
  min-height: calc(100vh - 600px);
}
</style>
