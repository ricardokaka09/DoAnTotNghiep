<template>
  <div class="home">
    <Hero />
    <Category />
    <FeaturedProduct />
    <Banner />
    <LatestProduct />
    <Blog />
  </div>
</template>

<script>
import Category from "../../components/default/Category.vue";
import FeaturedProduct from "../../components/default/FeaturedProduct.vue";
import Hero from "../../components/default/Hero.vue";
import LatestProduct from "../../components/default/LatestProduct.vue";
import Blog from "../../components/default/Blog.vue";
import Banner from "../../components/default/Banner.vue";
export default {
  name: "Home",
  components: {
    Category,
    FeaturedProduct,
    Hero,
    LatestProduct,
    Blog,
    Banner,
  },
};
</script>
