<template>
  <div>
    <div class="header">
      <div class="header__top">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="header__top__left">
                <ul>
                  <li>
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'envelope']"
                    />
                    Đăng ký bán hàng
                  </li>
                  <li>Kênh người bán</li>
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
                  <router-link :to="{ name: isLogin ? 'profile' : 'login' }">
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
                <li class="active"><a href="./index.html">Home</a></li>
                <li><a href="./shop-grid.html">Shop</a></li>
                <li>
                  <a href="#">Pages</a>
                  <ul class="header__menu__dropdown">
                    <li><a href="./shop-details.html">Shop Details</a></li>
                    <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                    <li><a href="./checkout.html">Check Out</a></li>
                    <li><a href="./blog-details.html">Blog Details</a></li>
                  </ul>
                </li>
                <li><a href="./blog.html">Blog</a></li>
                <li><a href="./contact.html">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div class="col-lg-3">
            <div class="header__cart">
              <ul>
                <li>
                  <a href="#" class="mx-2">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                    <span>1</span></a
                  >
                </li>
                <li>
                  <a href="#" class="mx-2">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-bag']"
                    />
                    <span>3</span></a
                  >
                </li>
              </ul>
              <div class="header__cart__price">item: <span>$150.00</span></div>
            </div>
          </div>
        </div>
        <div class="humberger__open">
          <!-- <font-awesome-icon class="sidebar-icon" :icon="['fas', 'menu']" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Constants } from "../../utils/constants.js";
import logo from "../../assets/img/logo.png";
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
};
</script>
