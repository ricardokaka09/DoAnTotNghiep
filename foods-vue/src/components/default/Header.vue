<template>
  <div>
    <div class="header">
      <div class="header__top">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="header__top__left">
                <ul>
                  <li v-on:click.prevent="registerStore()">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'envelope']"
                    />
                    Đăng ký bán hàng
                  </li>
                  <li v-on:click.prevent="channelStore()">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'envelope']"
                    />
                    Kênh người bán
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="header__top__right">
                <div class="header__top__right__language">
                  <router-link :to="{ name: 'register user' }">
                    {{ isLogin ? `` : `Register` }}
                  </router-link>
                </div>
                <div class="header__top__right__auth">
                  <router-link
                    :to="{ name: isLogin ? 'profile' : 'login user' }"
                  >
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', isLogin ? 'user' : 'lock']"
                    />
                    {{ isLogin ? `Profile` : `Login` }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="header__logo">
              <router-link :to="{ name: 'home' }">
                <img :src="logo" alt="" />
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <nav class="header__menu">
              <ul>
                <li class="active">
                  <router-link :to="{ name: 'home' }"> Home </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'list product' }">
                    Flash Buy
                  </router-link>
                </li>
                <li>
                  <a href="#">Pages</a>
                  <ul class="header__menu__dropdown">
                    <li><a href="./shop-details.html">Shop Details</a></li>
                    <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                    <li><a href="./checkout.html">Check Out</a></li>
                    <li><a href="./blog-details.html">Blog Details</a></li>
                  </ul>
                </li>
                <li>
                  <router-link :to="{ name: 'blog' }"> Blog </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'contact' }"> Contact </router-link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-lg-3">
            <div class="header__cart">
              <ul>
                <li>
                  <router-link :to="{ name: 'cart' }" class="mx-2">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-bag']"
                    />
                    <span>1</span>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'heart' }" class="mx-2">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                    <span>1</span>
                  </router-link>
                </li>
              </ul>
              <div class="header__cart__price">item: <span>$150.00</span></div>
            </div>
          </div>
        </div>
        <div class="humberger__open">
          <font-awesome-icon class="sidebar-icon" :icon="['fas', 'bars']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Constants } from "../../utils/constants.js";
import logo from "../../assets/img/logo_foods.png";
export default {
  name: "Header",
  data() {
    return {
      isLogin: false,
      logo: logo,
    };
  },
  created() {
    const token = localStorage.getItem(Constants.TOKEN);
    if (token) {
      this.isLogin = true;
    }
  },
  methods: {
    registerStore() {
      // eslint-disable-next-line no-debugger
      debugger;
      const token = localStorage.getItem(Constants.TOKEN);
      const role = localStorage.getItem(Constants.ROLE);
      if (token) {
        if (parseInt(role) != 2 || parseInt(role) != 1) {
          this.$router.push({ name: "register store" });
        }
      } else {
        this.$router.push({ name: "login user" });
      }
    },
    channelStore() {
      const token = localStorage.getItem(Constants.TOKEN);
      if (token) {
        const role = localStorage.getItem(Constants.ROLE);
        if (parseInt(role) === 2) {
          this.$router.push({ name: "DashboardStore" });
        } else if (parseInt(role) === 3) {
          this.$router.push({ name: "home" });
          this.$toaster.warning("Bạn chưa có store");
        }
      } else {
        this.$router.push({ name: "login user" });
      }
    },
  },
};
</script>
