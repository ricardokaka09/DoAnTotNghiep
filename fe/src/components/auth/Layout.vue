<template>
  <div class="auth-layout">
    <Header />
    <div class="auth-form d-flex justify-content-center">
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
// Import Main styles for this application
@import "../../views/auth/auth.scss";
</style>
