<template>
  <div class="header-default">
    <div class="header-top">
      <div
        class="container-fluid d-flex justify-content-between align-item-center"
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
            <router-link :to="{ name: 'register store' }">
              Đăng Ký Người Bán
            </router-link>
          </div>
          <div class="link_shop mx-2">
            <router-link :to="{ name: 'login' }"> Đăng Nhập </router-link>
          </div>
        </div>
      </div>
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
            class="header-info d-flex justify-content-center align-item-center"
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
<style lang="scss">
.header-top {
  background: #4caf50;
  padding: 10px 0;
  color: white;
  border-bottom: 1px solid white;
  .logo {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
    }
  }
  .header-welcome {
    font-size: 14px;
  }
  a {
    color: white;
    font-size: 14px;
    &:hover {
      text-decoration: none;
    }
    .header-link {
      cursor: pointer;
    }
  }
}
.header-bottom {
  background: #4caf50;
  border-bottom: 1px solid white;
  padding: 10px 0;
  .margin-auto {
    max-width: 1277px;
    margin: 0 auto;
    padding: 0px 10px;
    .logo {
      width: 200px;
      img {
        max-width: 100%;
      }
    }
    .header-info {
      width: 700px;
      .search-bar {
        width: 270px;
        background-color: #fff;
        height: 45px;
        position: relative;
        border: 2px solid #4caf50;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        align-items: center;
        input {
          width: calc(100% - 45px);
          height: 45px;
          outline: none;
          border: none;
          background-color: #fff;
          font-size: 14px;
          color: #000;
          padding-left: 10px;
          line-height: 14px;
        }
        button {
          width: 45px;
          height: 45px;
          outline: none;
          border: none;
          background: transparent;
          color: #ccc;
          font-size: 16px;
        }
      }
      .hotline {
        .hotline_number {
          display: inline-block;
          vertical-align: middle;
          padding-right: 10px;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          .hotline-link {
            font-size: 24px;
            font-weight: 700;
            font-style: italic;
            color: #f7f7f7;
            line-height: 20px;
          }
          p {
            font-size: 12px;
            text-align: center;
            margin-bottom: 0;
            font-style: italic;
            color: #fff;
          }
        }
        .hotline_shipping {
          margin: 0;
          width: 52%;
          display: inline-block;
          vertical-align: middle;
          padding-left: 10px;
        }
      }
    }
    .block_cart {
      .header-cart {
        display: block;
        vertical-align: middle;
        text-align: center;
        padding: 5px;
        a {
          position: relative;
          display: inline-block;
        }
      }
    }
  }
}
</style>
