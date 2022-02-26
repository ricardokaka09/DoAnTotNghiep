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
              <h2>{{ productByID.name }}</h2>
              <div class="breadcrumb__option">
                <router-link :to="{ name: 'home' }"> Home </router-link>
                <span>{{ productByID.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-details spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="product__details__pic">
              <div class="product__details__pic__item">
                <img
                  class="product__details__pic__item--large"
                  :src="productByID.photos"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="product__details__text">
              <h3>{{ productByID.name }}</h3>
              <div class="product__details__rating">
                <b-icon icon="star-fill" aria-hidden="true"></b-icon>
                <b-icon icon="star-fill" aria-hidden="true"></b-icon>
                <b-icon icon="star-fill" aria-hidden="true"></b-icon>
                <b-icon icon="star-fill" aria-hidden="true"></b-icon>
                <b-icon icon="star-half" aria-hidden="true"></b-icon>
                <span>(18 reviews)</span>
              </div>
              <div class="product__details__price">
                ${{ productByID.price }}
              </div>
              <p>
                {{ productByID.description }}
              </p>
              <div class="product__details__quantity">
                <div class="quantity">
                  <div class="pro-qty">
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'minus']"
                      @click="minusAmount()"
                    />
                    <input type="text" v-model="amount" />
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'plus']"
                      @click="addAmount()"
                    />
                  </div>
                </div>
              </div>
              <!-- <a href="#" class="primary-btn">ADD TO CARD</a> -->
              <b-button v-on:click="addNewCart()" class="mx-3" variant="success"
                >ADD TO CARD</b-button
              >
              <a href="#" class="heart-icon"
                ><b-icon icon="heart" aria-hidden="true"></b-icon
              ></a>
              <ul>
                <li><b>Availability</b> <span>In Stock</span></li>
                <li>
                  <b>Shipping</b>
                  <span>01 day shipping. <samp>Free pickup today</samp></span>
                </li>
                <li><b>Weight</b> <span>0.5 kg</span></li>
                <li>
                  <b>Share on</b>
                  <div class="share">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                    <a href="#"><i class="fa fa-pinterest"></i></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgBreadcrumb from "../../assets/img/breadcrumb.jpg";
import imgProduct from "../../assets/img/product/details/product-details-1.jpg";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ProductDetail",
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
      imgProduct: imgProduct,
      amount: 0,
    };
  },
  created() {
    const { params } = this.$route;
    console.log(params);
    this.getProductByID(params.id);
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
      }
    },
  },
  computed: {
    ...mapGetters(["productByID", "message", "success", "error"]),
  },
  methods: {
    ...mapActions({ getProductByID: "getProductByID" }),
    ...mapActions({ addToCart: "addToCart" }),
    addAmount() {
      this.amount = this.amount + 1;
    },
    minusAmount() {
      this.amount = this.amount - 1;
    },
    addNewCart() {
      const { params } = this.$route;
      const formData = {
        productID: params.id,
        quantity: this.amount,
      };
      this.addToCart(formData);
    },
  },
};
</script>
