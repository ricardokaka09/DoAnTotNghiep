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
import Header from "./Header";
import Footer from "./Footer";
export default {
  name: "Layout",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
.content {
  background: white;
  min-height: 100vh;
}
</style>
