<template>
  <div><Header /><Footer /></div>
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
// Import css slag
@import "../../views/default/default.scss";
</style>