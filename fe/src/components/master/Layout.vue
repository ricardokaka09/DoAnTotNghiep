<template>
  <div class="layout-master">
    <div class="layout-master-sidebar">
      <Sidebar @toggleSidebar="toggleSidebar" />
    </div>
    <div class="layout-master-content">
      <Header />
      <div class="main" :class="{ active: isActive }">
        <router-view :key="$route.fullPath"></router-view>
      </div>
      <Footer :isActive="isActive" />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
export default {
  name: "Layout",
  components: {
    Header,
    Footer,
    Sidebar,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleSidebar(data) {
      this.isActive = data;
    },
  },
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "@/views/master/master.scss";
</style>
