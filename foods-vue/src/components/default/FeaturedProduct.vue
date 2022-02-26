<template>
  <div class="featured spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title">
            <h2>Featured Product</h2>
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
                  <button
                    class="button-common-add"
                    v-on:click="addCart(item.productID)"
                  >
                    <font-awesome-icon
                      class="sidebar-icon"
                      :icon="['fas', 'shopping-cart']"
                    />
                  </button>
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
    ...mapGetters([
      "listProduct",
      "message",
      "success",
      "error",
      "productByID",
    ]),
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
  methods: {
    ...mapActions({ getProductByID: "getProductByID" }),
    ...mapActions({ addToCart: "addToCart" }),
    ...mapActions({ getListProduct: "getListProduct" }),
    addCart(id) {
      // eslint-disable-next-line no-debugger
      debugger;
      const formData = { productID: id, quantity: 1 };
      this.addToCart(formData);
    },
  },
};
</script>
<style lang="scss" scoped>
.button-common-add {
  font-size: 16px;
  color: #1c1c1c;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ebebeb;
  background: #ffffff;
  display: block;
  border-radius: 50%;
  transition: all, 0.5s;
  cursor: pointer;
}
</style>
