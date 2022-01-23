<template>
  <div>
    <div
      class="breadcrumb-section set-bg"
      v-bind:style="{ 'background-image': 'url(' + imgBreadcrumb + ')' }"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <div class="breadcrumb__text">
              <h2>Flash Buy</h2>
              <div class="breadcrumb__option">
                <router-link :to="{ name: 'home' }"> Home </router-link>
                <span>List Product</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-5">
            <div class="sidebar">
              <div class="sidebar__item">
                <h4>Department</h4>
                <ul>
                  <li v-for="item in listCategory" :key="item.categoryID">
                    <router-link :to="{ name: '#' }">
                      {{ item.name }}
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="sidebar__item">
                <h4>Price</h4>
                <div class="price-range-wrap">
                  <div class="">
                    <div
                      class="ui-slider-range ui-corner-all ui-widget-header"
                    ></div>
                    <span
                      tabindex="0"
                      class="ui-slider-handle ui-corner-all ui-state-default"
                    ></span>
                    <span
                      tabindex="0"
                      class="ui-slider-handle ui-corner-all ui-state-default"
                    ></span>
                  </div>
                  <div class="range-slider">
                    <div class="price-input">
                      <input type="text" id="minamount" />
                      <input type="text" id="maxamount" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="sidebar__item sidebar__item__color--option">
                <h4>Colors</h4>
                <div class="sidebar__item__color sidebar__item__color--white">
                  <label for="white">
                    White
                    <input type="radio" id="white" />
                  </label>
                </div>
                <div class="sidebar__item__color sidebar__item__color--gray">
                  <label for="gray">
                    Gray
                    <input type="radio" id="gray" />
                  </label>
                </div>
                <div class="sidebar__item__color sidebar__item__color--red">
                  <label for="red">
                    Red
                    <input type="radio" id="red" />
                  </label>
                </div>
                <div class="sidebar__item__color sidebar__item__color--black">
                  <label for="black">
                    Black
                    <input type="radio" id="black" />
                  </label>
                </div>
                <div class="sidebar__item__color sidebar__item__color--blue">
                  <label for="blue">
                    Blue
                    <input type="radio" id="blue" />
                  </label>
                </div>
                <div class="sidebar__item__color sidebar__item__color--green">
                  <label for="green">
                    Green
                    <input type="radio" id="green" />
                  </label>
                </div>
              </div>
              <div class="sidebar__item">
                <h4>Popular Size</h4>
                <div class="sidebar__item__size">
                  <label for="large">
                    Large
                    <input type="radio" id="large" />
                  </label>
                </div>
                <div class="sidebar__item__size">
                  <label for="medium">
                    Medium
                    <input type="radio" id="medium" />
                  </label>
                </div>
                <div class="sidebar__item__size">
                  <label for="small">
                    Small
                    <input type="radio" id="small" />
                  </label>
                </div>
                <div class="sidebar__item__size">
                  <label for="tiny">
                    Tiny
                    <input type="radio" id="tiny" />
                  </label>
                </div>
              </div>
              <div class="sidebar__item">
                <div class="latest-product__text">
                  <h4>Latest Products</h4>
                  <div class="latest-product__slider">
                    <VueSlickCarousel v-bind="setting1s">
                      <div class="latest-prdouct__slider__item">
                        <router-link
                          :to="{ name: '#' }"
                          class="latest-product__item"
                        >
                          <div class="latest-product__item__pic">
                            <img :src="imgLP1" alt="" />
                          </div>
                          <div class="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                          </div>
                        </router-link>
                        <router-link
                          :to="{ name: '#' }"
                          class="latest-product__item"
                        >
                          <div class="latest-product__item__pic">
                            <img :src="imgLP2" alt="" />
                          </div>
                          <div class="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                          </div>
                        </router-link>
                        <router-link
                          :to="{ name: '#' }"
                          class="latest-product__item"
                        >
                          <div class="latest-product__item__pic">
                            <img :src="imgLP3" alt="" />
                          </div>
                          <div class="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                          </div>
                        </router-link>
                      </div>
                      <div class="latest-prdouct__slider__item">
                        <router-link
                          :to="{ name: '#' }"
                          class="latest-product__item"
                        >
                          <div class="latest-product__item__pic">
                            <img :src="imgLP1" alt="" />
                          </div>
                          <div class="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                          </div>
                        </router-link>
                        <router-link
                          :to="{ name: '#' }"
                          class="latest-product__item"
                        >
                          <div class="latest-product__item__pic">
                            <img :src="imgLP2" alt="" />
                          </div>
                          <div class="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                          </div>
                        </router-link>
                        <router-link
                          :to="{ name: '#' }"
                          class="latest-product__item"
                        >
                          <div class="latest-product__item__pic">
                            <img :src="imgLP3" alt="" />
                          </div>
                          <div class="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                          </div>
                        </router-link>
                      </div></VueSlickCarousel
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-7">
            <div class="product__discount">
              <div class="section-title product__discount__title">
                <h2>Sale Off</h2>
              </div>
              <div>
                <div class="">
                  <div class="product__discount__slider">
                    <VueSlickCarousel v-bind="settings2">
                      <div
                        class="product__discount__item"
                        v-for="item in listProductSlide"
                        :key="item.id"
                      >
                        <div
                          class="product__discount__item__pic set-bg"
                          v-bind:style="{
                            'background-image': 'url(' + item.img + ')',
                          }"
                        >
                          <div class="product__discount__percent">-20%</div>
                          <ul class="product__item__pic__hover">
                            <li>
                              <router-link :to="{ name: 'cart' }" class="mx-2">
                                <font-awesome-icon
                                  class="sidebar-icon"
                                  :icon="['fas', 'heart']"
                                />
                              </router-link>
                            </li>
                            <li>
                              <router-link :to="{ name: 'cart' }" class="mx-2">
                                <font-awesome-icon
                                  class="sidebar-icon"
                                  :icon="['fas', 'retweet']"
                                />
                              </router-link>
                            </li>
                            <li>
                              <router-link :to="{ name: 'cart' }" class="mx-2">
                                <font-awesome-icon
                                  class="sidebar-icon"
                                  :icon="['fas', 'shopping-bag']"
                                />
                              </router-link>
                            </li>
                          </ul>
                        </div>
                        <div class="product__discount__item__text">
                          <span>{{ item.category }}</span>
                          <h5>
                            <a href="#">{{ item.name }}</a>
                          </h5>
                          <div class="product__item__price">
                            ${{ item.price }}
                            <span>${{ item.priceBefore }}</span>
                          </div>
                        </div>
                      </div>
                    </VueSlickCarousel>
                  </div>
                </div>
              </div>
            </div>
            <div class="filter__item"></div>
            <div class="row">
              <div
                class="col-lg-4 col-md-6 col-sm-6"
                v-for="item in listProduct"
                :key="item.id"
              >
                <div class="product__item">
                  <router-link
                    :to="{ name: 'product detail', params: { id: item.id } }"
                  >
                    <div
                      class="product__item__pic set-bg"
                      v-bind:style="{
                        'background-image': 'url(' + item.img + ')',
                      }"
                    >
                      <ul class="product__item__pic__hover">
                        <li>
                          <router-link :to="{ name: 'cart' }" class="mx-2">
                            <font-awesome-icon
                              class="sidebar-icon"
                              :icon="['fas', 'heart']"
                            />
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'cart' }" class="mx-2">
                            <font-awesome-icon
                              class="sidebar-icon"
                              :icon="['fas', 'retweet']"
                            />
                          </router-link>
                        </li>
                        <li>
                          <router-link :to="{ name: 'cart' }" class="mx-2">
                            <font-awesome-icon
                              class="sidebar-icon"
                              :icon="['fas', 'shopping-bag']"
                            />
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <div class="product__item__text">
                      <h6>
                        <a href="#">{{ item.name }}</a>
                      </h6>
                      <h5>${{ item.price }}</h5>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="product__pagination">
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#"
                ><font-awesome-icon
                  class="sidebar-icon"
                  :icon="['fas', 'arrow-right']"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgBreadcrumb from "../../assets/img/breadcrumb.jpg";
import { mapActions, mapGetters } from "vuex";
import imgLP1 from "../../assets/img/categories/cat-1.jpg";
import imgLP2 from "../../assets/img/categories/cat-2.jpg";
import imgLP3 from "../../assets/img/categories/cat-3.jpg";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "ListProduct",
  components: { VueSlickCarousel },
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
      imgLP1: imgLP1,
      imgLP2: imgLP2,
      imgLP3: imgLP3,
      listProduct: [
        { id: 1, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 2, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 3, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 4, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 5, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 6, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 7, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 8, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 9, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 10, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 11, img: imgLP1, name: "Crab Pool Security", price: 200 },
        { id: 12, img: imgLP1, name: "Crab Pool Security", price: 200 },
      ],
      listProductSlide: [
        {
          id: 1,
          img: imgLP1,
          name: "Crab Pool Security",
          price: 200,
          category: "Category",
          priceBefore: 400,
        },
        {
          id: 2,
          img: imgLP2,
          name: "Crab Pool Security",
          price: 200,
          category: "Category",
          priceBefore: 400,
        },
        {
          id: 3,
          img: imgLP3,
          name: "Crab Pool Security",
          price: 200,
          category: "Category",
          priceBefore: 400,
        },
        {
          id: 4,
          img: imgLP1,
          name: "Crab Pool Security",
          price: 200,
          category: "Category",
          priceBefore: 400,
        },
        {
          id: 5,
          img: imgLP2,
          name: "Crab Pool Security",
          price: 200,
          category: "Category",
          priceBefore: 400,
        },
        {
          id: 6,
          img: imgLP3,
          name: "Crab Pool Security",
          price: 200,
          category: "Category",
          priceBefore: 400,
        },
      ],
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
      settings2: {
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        draggable: false,
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
    this.getListCategory();
  },
  computed: {
    ...mapGetters(["listCategory", "message", "error"]),
  },
  watch: {
    success() {
      if (this.success) {
        this.$toaster.success(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
      }
    },
    error() {
      if (this.error) {
        this.$toaster.error(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["error", false]);
        setTimeout(() => {
          this.$router.go();
        }, 2000);
      }
    },
  },
  methods: {
    ...mapActions({ getListCategory: "getListCategory" }),
  },
};
</script>
<style lang="scss">
.product__discount__slider {
  .set-bg {
    margin: 0 15px;
  }
}
</style>
