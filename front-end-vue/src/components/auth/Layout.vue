<template>
  <div class="auth-layout">
    <div class="container">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>
<style lang="scss">
// Import Main styles for this application
@import "../../views/auth/auth.scss";
</style>
