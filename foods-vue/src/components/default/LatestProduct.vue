<template>
  <div class="latest-product spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="latest-product__text">
            <h4>Latest Products</h4>
            <div class="latest-product__slider owl-carousel">
              <VueSlickCarousel v-bind="setting1s">
                <div class="latest-prdouct__slider__item">
                  <router-link
                    :to="{ name: '#' }"
                    class="latest-product__item"
                    v-for="(item, index) in listProduct"
                    :key="index"
                  >
                    <div v-if="index < 3">
                      <div class="latest-product__item__pic">
                        <img :src="item.photos" alt="" />
                      </div>
                      <div class="latest-product__item__text">
                        <h6>{{ item.name }}</h6>
                        <span>{{ item.price }}</span>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="latest-prdouct__slider__item">
                  <router-link
                    :to="{ name: '#' }"
                    class="latest-product__item"
                    v-for="(item, index) in listProduct"
                    :key="index"
                  >
                    <div v-if="index < 3">
                      <div class="latest-product__item__pic">
                        <img :src="item.photos" alt="" />
                      </div>
                      <div class="latest-product__item__text">
                        <h6>{{ item.name }}</h6>
                        <span>{{ item.price }}</span>
                      </div>
                    </div>
                  </router-link>
                </div></VueSlickCarousel
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="latest-product__text">
            <h4>Top Rated Products</h4>
            <div class="latest-product__slider owl-carousel">
              <VueSlickCarousel v-bind="setting1s">
                <div class="latest-prdouct__slider__item">
                  <router-link
                    :to="{ name: '#' }"
                    class="latest-product__item"
                    v-for="(item, index) in listProduct"
                    :key="index"
                  >
                    <div v-if="index < 3">
                      <div class="latest-product__item__pic">
                        <img :src="item.photos" alt="" />
                      </div>
                      <div class="latest-product__item__text">
                        <h6>{{ item.name }}</h6>
                        <span>${{ item.price }}</span>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="latest-prdouct__slider__item">
                  <router-link
                    :to="{ name: '#' }"
                    class="latest-product__item"
                    v-for="(item, index) in listProduct"
                    :key="index"
                  >
                    <div v-if="index < 3">
                      <div class="latest-product__item__pic">
                        <img :src="item.photos" alt="" />
                      </div>
                      <div class="latest-product__item__text">
                        <h6>{{ item.name }}</h6>
                        <span>${{ item.price }}</span>
                      </div>
                    </div>
                  </router-link>
                </div></VueSlickCarousel
              >
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="latest-product__text">
            <h4>Review Products</h4>
            <div class="latest-product__slider owl-carousel">
              <VueSlickCarousel v-bind="setting1s">
                <div class="latest-prdouct__slider__item">
                  <router-link
                    :to="{ name: '#' }"
                    class="latest-product__item"
                    v-for="(item, index) in listProduct"
                    :key="index"
                  >
                    <div v-if="index < 3">
                      <div class="latest-product__item__pic">
                        <img :src="item.photos" alt="" />
                      </div>
                      <div class="latest-product__item__text">
                        <h6>{{ item.name }}</h6>
                        <span>${{ item.price }}</span>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="latest-prdouct__slider__item">
                  <router-link
                    :to="{ name: '#' }"
                    class="latest-product__item"
                    v-for="(item, index) in listProduct"
                    :key="index"
                  >
                    <div v-if="index > 3">
                      <div class="latest-product__item__pic">
                        <img :src="item.photos" alt="" />
                      </div>
                      <div class="latest-product__item__text">
                        <h6>{{ item.name }}</h6>
                        <span>${{ item.price }}</span>
                      </div>
                    </div>
                  </router-link>
                </div></VueSlickCarousel
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LatestProduct",
  components: { VueSlickCarousel },
  data() {
    return {
      listTest: [],
      active: false,
      setting1s: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
              arrows: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              arrows: false,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      },
    };
  },
  created() {
    this.getListProduct();
  },
  watch: {},
  computed: {
    ...mapGetters(["listProduct", "message", "success", "error"]),
  },
  methods: {
    ...mapActions({ getListProduct: "getListProduct" }),
  },
};
</script>
