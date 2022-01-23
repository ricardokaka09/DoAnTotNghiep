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
              <h2>Vegetable’s Package</h2>
              <div class="breadcrumb__option">
                <router-link :to="{ name: 'home' }"> Home </router-link>
                <span>Vegetable’s Package</span>
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
                  :src="imgProduct"
                  alt=""
                />
              </div>
              <!-- <div class="product__details__pic__slider owl-carousel">
                <img
                  data-imgbigurl="img/product/details/product-details-2.jpg"
                  src="img/product/details/thumb-1.jpg"
                  alt=""
                />
                <img
                  data-imgbigurl="img/product/details/product-details-3.jpg"
                  src="img/product/details/thumb-2.jpg"
                  alt=""
                />
                <img
                  data-imgbigurl="img/product/details/product-details-5.jpg"
                  src="img/product/details/thumb-3.jpg"
                  alt=""
                />
                <img
                  data-imgbigurl="img/product/details/product-details-4.jpg"
                  src="img/product/details/thumb-4.jpg"
                  alt=""
                />
              </div> -->
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="product__details__text">
              <h3>Vetgetable’s Package</h3>
              <div class="product__details__rating">
                <b-icon icon="star-fill" aria-hidden="true"></b-icon>
                <b-icon icon="star-fill" aria-hidden="true"></b-icon>
                <b-icon icon="star-fill" aria-hidden="true"></b-icon>
                <b-icon icon="star-fill" aria-hidden="true"></b-icon>
                <b-icon icon="star-half" aria-hidden="true"></b-icon>
                <span>(18 reviews)</span>
              </div>
              <div class="product__details__price">$50.00</div>
              <p>
                Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                vehicula elementum sed sit amet dui. Proin eget tortor risus.
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
              <a href="#" class="primary-btn">ADD TO CARD</a>
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
export default {
  name: "ProductDetail",
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
      imgProduct: imgProduct,
      amount: 0,
    };
  },
  methods: {
    addAmount() {
      this.amount = this.amount + 1;
    },
    minusAmount() {
      this.amount = this.amount - 1;
    },
  },
};
</script>
