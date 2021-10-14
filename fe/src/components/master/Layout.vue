<template>
  <div><Header /><Footer /><Sidebar /></div>
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
@import "../../views/master/master.scss";
</style>