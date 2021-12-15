<template>
  <div class="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="hero__categories">
            <div class="hero__categories__all">
              <span>Department</span>
            </div>
            <ul>
              <li v-for="item in listCategory" :key="item.categoryID">
                <router-link :to="{ name: '#' }">
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="hero__search">
            <div class="hero__search__form">
              <form action="#">
                <input type="text" placeholder="What do you need?" />
                <button type="submit" class="site-btn">SEARCH</button>
              </form>
            </div>
            <div class="hero__search__phone">
              <div class="hero__search__phone__icon">
                <font-awesome-icon
                  class="sidebar-icon"
                  :icon="['fas', 'phone']"
                />
              </div>
              <div class="hero__search__phone__text">
                <h5>+84 987 654 321</h5>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
          <div
            class="hero__item set-bg"
            v-bind:style="{ 'background-image': 'url(' + bannerImg + ')' }"
          >
            <div class="hero__text">
              <span>FRUIT FRESH</span>
              <h2>Vegetable <br />100% Organic</h2>
              <p>Free Pickup and Delivery Available</p>
              <a href="#" class="primary-btn">SHOP NOW</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bannerImg from "../../assets/img/hero/banner.jpg";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Hero",
  data() {
    return {
      bannerImg: bannerImg,
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
