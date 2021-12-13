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
                    Register
                  </router-link>
                </div>
                <div class="header__top__right__auth">
                  <router-link :to="{ name: isLogin ? 'profile' : 'login' }">
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
<style scoped>
.header__top {
  background: #f5f5f5;
}

.header__top__left {
  padding: 10px 0 13px;
}

.header__top__left ul li {
  font-size: 14px;
  color: #1c1c1c;
  display: inline-block;
  margin-right: 45px;
  position: relative;
}

.header__top__left ul li:after {
  position: absolute;
  right: -25px;
  top: 1px;
  height: 20px;
  width: 1px;
  background: #000000;
  opacity: 0.1;
  content: "";
}

.header__top__left ul li:last-child {
  margin-right: 0;
}

.header__top__left ul li:last-child:after {
  display: none;
}

.header__top__left ul li i {
  color: #252525;
  margin-right: 5px;
}

.header__top__right {
  text-align: right;
  padding: 10px 0 13px;
}
.header__top__right__language {
  position: relative;
  display: inline-block;
  margin-right: 40px;
  cursor: pointer;
}
.header__top__right__language a {
  color: #1c1c1c;
}

.header__top__right__auth {
  display: inline-block;
}

.header__top__right__auth a {
  display: block;
  font-size: 14px;
  color: #1c1c1c;
}

.header__top__right__auth a i {
  margin-right: 6px;
}

.header__logo {
  padding: 15px 0;
}

.header__logo a {
  display: inline-block;
}

.header__menu {
  padding: 24px 0;
}

.header__menu ul li {
  list-style: none;
  display: inline-block;
  margin-right: 50px;
  position: relative;
}

.header__menu ul li .header__menu__dropdown {
  position: absolute;
  left: 0;
  top: 50px;
  background: #222222;
  width: 180px;
  z-index: 9;
  padding: 5px 0;
  -webkit-transition: all, 0.3s;
  -moz-transition: all, 0.3s;
  -ms-transition: all, 0.3s;
  -o-transition: all, 0.3s;
  transition: all, 0.3s;
  opacity: 0;
  visibility: hidden;
}

.header__menu ul li .header__menu__dropdown li {
  margin-right: 0;
  display: block;
}

.header__menu ul li .header__menu__dropdown li:hover > a {
  color: #7fad39;
}

.header__menu ul li .header__menu__dropdown li a {
  text-transform: capitalize;
  color: #ffffff;
  font-weight: 400;
  padding: 5px 15px;
}

.header__menu ul li.active a {
  color: #7fad39;
}

.header__menu ul li:hover .header__menu__dropdown {
  top: 30px;
  opacity: 1;
  visibility: visible;
}

.header__menu ul li:hover > a {
  color: #7fad39;
}

.header__menu ul li:last-child {
  margin-right: 0;
}

.header__menu ul li a {
  font-size: 14px;
  color: #252525;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;
  -webkit-transition: all, 0.3s;
  -moz-transition: all, 0.3s;
  -ms-transition: all, 0.3s;
  -o-transition: all, 0.3s;
  transition: all, 0.3s;
  padding: 5px 0;
  display: block;
}

.header__cart {
  text-align: right;
  padding: 24px 0;
}

.header__cart ul {
  display: inline-block;
  margin-right: 25px;
}

.header__cart ul li {
  list-style: none;
  display: inline-block;
  margin-right: 15px;
}

.header__cart ul li:last-child {
  margin-right: 0;
}

.header__cart ul li a {
  position: relative;
}

.header__cart ul li a svg {
  font-size: 18px;
  color: #1c1c1c;
}

.header__cart ul li a span {
  height: 13px;
  width: 13px;
  background: #7fad39;
  font-size: 10px;
  color: #ffffff;
  line-height: 13px;
  text-align: center;
  font-weight: 700;
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: -12px;
}

.header__cart .header__cart__price {
  font-size: 14px;
  color: #6f6f6f;
  display: inline-block;
}

.header__cart .header__cart__price span {
  color: #252525;
  font-weight: 700;
}

.humberger__menu__wrapper {
  display: none;
}

.humberger__open {
  display: none;
}
</style>
