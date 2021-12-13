<template>
  <div class="featured spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>Featured Product</h2>
          </div>
          <div class="featured__controls">
            <ul>
              <li class="active" data-filter="" :selected="true">All</li>
              <li data-filter=".oranges" v-on:click="changeTab()">Oranges</li>
              <li data-filter=".fresh-meat">Fresh Meat</li>
              <li data-filter=".vegetables">Vegetables</li>
              <li data-filter=".fastfood">Fastfood</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row featured__filter">
        <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + imgFeatured1 + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'retweet']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6><a href="#">Crab Pool Security</a></h6>
              <h5>$30.00</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + imgFeatured2 + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'retweet']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6><a href="#">Crab Pool Security</a></h6>
              <h5>$30.00</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 mix vegetables fresh-meat">
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + imgFeatured3 + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'retweet']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6><a href="#">Crab Pool Security</a></h6>
              <h5>$30.00</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 mix fastfood oranges">
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + imgFeatured4 + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'retweet']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6><a href="#">Crab Pool Security</a></h6>
              <h5>$30.00</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + imgFeatured5 + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'retweet']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6><a href="#">Crab Pool Security</a></h6>
              <h5>$30.00</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 mix oranges fastfood">
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + imgFeatured6 + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'retweet']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6><a href="#">Crab Pool Security</a></h6>
              <h5>$30.00</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + imgFeatured7 + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'retweet']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6><a href="#">Crab Pool Security</a></h6>
              <h5>$30.00</h5>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6 mix fastfood vegetables">
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + imgFeatured8 + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'heart']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'retweet']"
                    />
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: '#' }">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="featured__item__text">
              <h6><a href="#">Crab Pool Security</a></h6>
              <h5>$30.00</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import imgFeatured1 from "../../assets/img/featured/feature-1.jpg";
import imgFeatured2 from "../../assets/img/featured/feature-2.jpg";
import imgFeatured3 from "../../assets/img/featured/feature-3.jpg";
import imgFeatured4 from "../../assets/img/featured/feature-4.jpg";
import imgFeatured5 from "../../assets/img/featured/feature-5.jpg";
import imgFeatured6 from "../../assets/img/featured/feature-6.jpg";
import imgFeatured7 from "../../assets/img/featured/feature-7.jpg";
import imgFeatured8 from "../../assets/img/featured/feature-8.jpg";
export default {
  name: "FeatureProduct",
  data() {
    return {
      imgFeatured1: imgFeatured1,
      imgFeatured2: imgFeatured2,
      imgFeatured3: imgFeatured3,
      imgFeatured4: imgFeatured4,
      imgFeatured5: imgFeatured5,
      imgFeatured6: imgFeatured6,
      imgFeatured7: imgFeatured7,
      imgFeatured8: imgFeatured8,
    };
  },
  methods: {
    changeTab() {
      $(".featured__controls li").on("click", function () {
        $(".featured__controls li").removeClass("active");
        $(this).addClass("active");
      });
    },
  },
};
</script>

<style scoped>
.featured {
  padding-top: 80px;
  padding-bottom: 40px;
}

.featured__controls {
  text-align: center;
  margin-bottom: 50px;
}

.featured__controls ul li {
  list-style: none;
  font-size: 18px;
  color: #1c1c1c;
  display: inline-block;
  margin-right: 25px;
  position: relative;
  cursor: pointer;
}

.featured__controls ul li.active:after {
  opacity: 1;
}

.featured__controls ul li:after {
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: #7fad39;
  content: "";
  opacity: 0;
}

.featured__controls ul li:last-child {
  margin-right: 0;
}

.featured__item {
  margin-bottom: 50px;
}

.featured__item:hover .featured__item__pic .featured__item__pic__hover {
  bottom: 20px;
}

.featured__item__pic {
  height: 270px;
  position: relative;
  overflow: hidden;
  background-position: center center;
}

.featured__item__pic__hover {
  position: absolute;
  left: 0;
  bottom: -50px;
  width: 100%;
  text-align: center;
  -webkit-transition: all, 0.5s;
  -moz-transition: all, 0.5s;
  -ms-transition: all, 0.5s;
  -o-transition: all, 0.5s;
  transition: all, 0.5s;
}

.featured__item__pic__hover li {
  list-style: none;
  display: inline-block;
  margin-right: 6px;
}

.featured__item__pic__hover li:last-child {
  margin-right: 0;
}

.featured__item__pic__hover li:hover a {
  background: #7fad39;
  border-color: #7fad39;
}

.featured__item__pic__hover li:hover a i {
  color: #ffffff;
  transform: rotate(360deg);
}

.featured__item__pic__hover li a {
  font-size: 16px;
  color: #1c1c1c;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ebebeb;
  background: #ffffff;
  display: block;
  border-radius: 50%;
  -webkit-transition: all, 0.5s;
  -moz-transition: all, 0.5s;
  -ms-transition: all, 0.5s;
  -o-transition: all, 0.5s;
  transition: all, 0.5s;
}

.featured__item__pic__hover li a i {
  position: relative;
  transform: rotate(0);
  -webkit-transition: all, 0.3s;
  -moz-transition: all, 0.3s;
  -ms-transition: all, 0.3s;
  -o-transition: all, 0.3s;
  transition: all, 0.3s;
}

.featured__item__text {
  text-align: center;
  padding-top: 15px;
}

.featured__item__text h6 {
  margin-bottom: 10px;
}

.featured__item__text h6 a {
  color: #252525;
}

.featured__item__text h5 {
  color: #252525;
  font-weight: 700;
}

/*---------------------
  Latest Product
-----------------------*/

.latest-product {
  padding-top: 80px;
  padding-bottom: 0;
}

.latest-product__text h4 {
  font-weight: 700;
  color: #1c1c1c;
  margin-bottom: 45px;
}

.latest-product__slider.owl-carousel .owl-nav {
  position: absolute;
  right: 20px;
  top: -75px;
}

.latest-product__slider.owl-carousel .owl-nav button {
  height: 30px;
  width: 30px;
  background: #f3f6fa;
  border: 1px solid #e6e6e6;
  font-size: 14px;
  color: #636363;
  margin-right: 10px;
  line-height: 30px;
  text-align: center;
}

.latest-product__slider.owl-carousel .owl-nav button span {
  font-weight: 700;
}

.latest-product__slider.owl-carousel .owl-nav button:last-child {
  margin-right: 0;
}

.latest-product__item {
  margin-bottom: 20px;
  overflow: hidden;
  display: block;
}

.latest-product__item__pic {
  float: left;
  margin-right: 26px;
}

.latest-product__item__pic img {
  height: 110px;
  width: 110px;
}

.latest-product__item__text {
  overflow: hidden;
  padding-top: 10px;
}

.latest-product__item__text h6 {
  color: #252525;
  margin-bottom: 8px;
}

.latest-product__item__text span {
  font-size: 18px;
  display: block;
  color: #252525;
  font-weight: 700;
}
</style>
