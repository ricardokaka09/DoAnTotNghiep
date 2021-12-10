<template>
  <div class="default-layout">
    <Header />
    <div class="content">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";
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
@import "../../views/default/Default.scss";
</style>
