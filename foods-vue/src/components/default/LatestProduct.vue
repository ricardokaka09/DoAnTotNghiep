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
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP1" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP2" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
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
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP1" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP2" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
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
        <div class="col-lg-4 col-md-6">
          <div class="latest-product__text">
            <h4>Top Rated Products</h4>
            <div class="latest-product__slider owl-carousel">
              <VueSlickCarousel v-bind="setting1s">
                <div class="latest-prdouct__slider__item">
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP1" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP2" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
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
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP1" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP2" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
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
        <div class="col-lg-4 col-md-6">
          <div class="latest-product__text">
            <h4>Review Products</h4>
            <div class="latest-product__slider owl-carousel">
              <VueSlickCarousel v-bind="setting1s">
                <div class="latest-prdouct__slider__item">
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP1" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP2" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
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
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP1" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
                    <div class="latest-product__item__pic">
                      <img :src="imgLP2" alt="" />
                    </div>
                    <div class="latest-product__item__text">
                      <h6>Crab Pool Security</h6>
                      <span>$30.00</span>
                    </div>
                  </router-link>
                  <router-link :to="{ name: '#' }" class="latest-product__item">
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
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import imgLP1 from "../../assets/img/categories/cat-1.jpg";
import imgLP2 from "../../assets/img/categories/cat-2.jpg";
import imgLP3 from "../../assets/img/categories/cat-3.jpg";
export default {
  name: "LatestProduct",
  components: { VueSlickCarousel },
  data() {
    return {
      imgLP1: imgLP1,
      imgLP2: imgLP2,
      imgLP3: imgLP3,
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
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
};
</script>
