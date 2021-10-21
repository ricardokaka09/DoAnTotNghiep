<template>
  <div class="footer" :class="{ active: isActive }">
    <div class="copyright">Copyright© 2021 Flash Buy</div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    isActive: Boolean,
  },
};
</script>
