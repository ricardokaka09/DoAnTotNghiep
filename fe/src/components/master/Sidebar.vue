<template>
  <div class="sidebar" :class="{ active: isActive }">
    <div class="brand d-flex justify-content-center align-items-center">
      <div class="logo">
        <img :src="logo" alt="" />
      </div>
      <div class="brand-name">Flash Buy</div>
      <div class="sidebar-btn" @click="toggleSidebar">
        <div class="bars-btn">
          <div class="bars-btn-line"></div>
          <div class="bars-btn-line"></div>
          <div class="bars-btn-line"></div>
        </div>
      </div>
    </div>
    <div class="menu-sidebar" :class="{ active: isActive }">
      <div class="menu-sidebar-items">
        <!-- <div class="menu-sidebar-item">
          <router-link :to="{ name: 'list content' }">
            <div class="menu-sidebar-item-btn">
              <font-awesome-icon class="sidebar-icon" :icon="['fas', 'home']" />
              <div class="sidebar-text">Content</div>
            </div>
          </router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/img/img103.png";
export default {
  name: "Sidebar",
  data() {
    return {
      logo: logo,
      isActive: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive;
      this.$emit("toggleSidebar", this.isActive);
    },
  },
};
</script>
