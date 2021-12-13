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
