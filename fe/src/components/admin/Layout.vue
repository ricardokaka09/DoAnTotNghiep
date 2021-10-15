<template>
  <div class="admin-layout">
    <div class="layout-admin-sidebar">
      <Sidebar @toggleSidebar="toggleSidebar" />
    </div>
    <div class="layout-admin-content">
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
};
</script>

<style lang="scss">
// Import css slag
@import "../../views/admin/admin.scss";
</style>
