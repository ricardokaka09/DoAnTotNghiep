<template>
  <div class="header-default">
    <div class="header-top">
      <CContainer
        fluid
        class="d-flex justify-content-between align-items-center"
      >
        <div class="logo d-flex align-items-center">
          <div class="header-welcome mx-4">Welcome you to Flash Buy!</div>
        </div>
        <div class="header-link d-flex">
          <div class="link_shop mx-2">
            <router-link :to="{ name: 'login store' }">
              Kênh Người Bán
            </router-link>
          </div>
          <div class="link_shop mx-2">
            <router-link :to="{ name: 'create store' }">
              Đăng Ký Người Bán
            </router-link>
          </div>
          <div class="link_shop mx-2">
            <router-link :to="{ name: 'login' }"> Đăng Nhập </router-link>
          </div>
        </div>
      </CContainer>
    </div>
    <div class="header-bottom">
      <div class="margin-auto">
        <div class="d-flex justify-content-between">
          <div class="logo">
            <router-link :to="{ name: 'home' }">
              <img src="../../assets/img/logo2.png" alt="" />
            </router-link>
          </div>
          <div
            class="
              header-info
              d-flex
              justify-content-between
              align-items-center
            "
          >
            <div class="search-bar">
              <input
                class="input-search-auto"
                type="text"
                placeholder="Nhập từ khóa tìm kiếm"
              />
              <button type="submit" class="btn-search">
                <font-awesome-icon
                  class="sidebar-icon"
                  :icon="['fas', 'search']"
                />
              </button>
            </div>
            <div class="hotline">
              <div class="hotline_number">
                <span class="hotline-link">0979831203</span>
                <p>(Trực máy 24/24)</p>
              </div>
              <div class="hotline_shipping">
                <img src="../../assets/img/giaohang.png" alt="" />
              </div>
            </div>
          </div>
          <div class="cart-block">
            <div class="header-cart">
              <router-link :to="{ name: 'cart' }">
                <img src="../../assets/img/cart.webp" alt="" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>
