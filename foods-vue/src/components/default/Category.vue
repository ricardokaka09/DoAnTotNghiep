<template>
  <div class="categories">
    <div class="container">
      <VueSlickCarousel v-bind="settings">
        <div
          class="categories__item set-bg mx-2"
          v-bind:style="{ 'background-image': 'url(' + imgCategory1 + ')' }"
        >
          <h5><a href="#">Fresh Fruit</a></h5>
        </div>
        <div
          class="categories__item set-bg mx-2"
          v-bind:style="{ 'background-image': 'url(' + imgCategory2 + ')' }"
        >
          <h5><a href="#">Fresh Fruit</a></h5>
        </div>
        <div
          class="categories__item set-bg mx-2"
          v-bind:style="{ 'background-image': 'url(' + imgCategory3 + ')' }"
        >
          <h5><a href="#">Fresh Fruit</a></h5>
        </div>
        <div
          class="categories__item set-bg mx-2"
          v-bind:style="{ 'background-image': 'url(' + imgCategory4 + ')' }"
        >
          <h5><a href="#">Fresh Fruit</a></h5>
        </div>
        <div
          class="categories__item set-bg mx-2"
          v-bind:style="{ 'background-image': 'url(' + imgCategory5 + ')' }"
        >
          <h5><a href="#">Fresh Fruit</a></h5>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import imgCategory1 from "../../assets/img/categories/cat-1.jpg";
import imgCategory2 from "../../assets/img/categories/cat-2.jpg";
import imgCategory3 from "../../assets/img/categories/cat-3.jpg";
import imgCategory4 from "../../assets/img/categories/cat-4.jpg";
import imgCategory5 from "../../assets/img/categories/cat-5.jpg";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "Category",
  components: { VueSlickCarousel },
  data() {
    return {
      imgCategory1: imgCategory1,
      imgCategory2: imgCategory2,
      imgCategory3: imgCategory3,
      imgCategory4: imgCategory4,
      imgCategory5: imgCategory5,
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
