<template>
  <div class="auth-layout d-flex justify-content-center align-items-center">
    <div class="auth-form">
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
