<template>
  <div class="c-app">
    <TheSidebar />
    <CWrapper>
      <TheHeader />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter />
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from "./Sidebar";
import TheHeader from "./Header";
import TheFooter from "./Footer";
import { Constants } from "../../utils/constants.js";

export default {
  name: "TheContainer",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  },
  created() {
    const token = localStorage.getItem(Constants.TOKEN);
    const role = localStorage.getItem(Constants.ROLE);
    console.log(role);
    if (token) {
      const role = localStorage.getItem(Constants.ROLE);
      if (parseInt(role) === 1) {
        this.$router.push({ name: "dashboard store" });
      } else {
        this.$router.push({ name: "home" });
      }
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
