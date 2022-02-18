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
        <div
          class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
          v-for="(item, index) in listProduct"
          :key="index"
        >
          <div class="featured__item">
            <div
              class="featured__item__pic set-bg"
              v-bind:style="{ 'background-image': 'url(' + item.photos + ')' }"
            >
              <ul class="featured__item__pic__hover">
                <li>
                  <router-link :to="{ name: '' }">
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
              <h6>
                <router-link
                  :to="{
                    name: 'product detail',
                    params: { id: item.productID },
                  }"
                  >{{ item.name }}</router-link
                >
              </h6>
              <h5>${{ item.price }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "FeatureProduct",
  data() {
    return {};
  },
  created() {
    this.getListProduct();
  },
  computed: {
    ...mapGetters(["listProduct", "message", "success", "error"]),
  },
  methods: {
    ...mapActions({ getListProduct: "getListProduct" }),
    changeTab() {
      $(".featured__controls li").on("click", function () {
        $(".featured__controls li").removeClass("active");
        $(this).addClass("active");
      });
    },
  },
};
</script>
