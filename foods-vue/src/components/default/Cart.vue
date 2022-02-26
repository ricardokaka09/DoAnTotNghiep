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
              <h2>Shopping Cart</h2>
              <div class="breadcrumb__option">
                <router-link :to="{ name: 'home' }"> Home </router-link>
                <span>Shopping Cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shoping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th class="shoping__product">Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in listCart1" :key="index">
                    <td class="shoping__cart__item">
                      <!-- <img src="img/cart/cart-1.jpg" alt="" /> -->
                      <h5 class="w-50">{{ item.name }}</h5>
                      <b-button
                        class="mx-4"
                        variant="warning"
                        v-on:click="removeCart(item.orderProductID)"
                        >Remove</b-button
                      >
                    </td>
                    <td class="shoping__cart__price">${{ item.price }}</td>
                    <td class="shoping__cart__quantity">
                      <div class="quantity">
                        <div class="pro-qty">
                          {{ item.quantity }}
                        </div>
                      </div>
                    </td>
                    <td class="shoping__cart__total">
                      ${{ item.price * item.quantity }}
                    </td>
                    <td class="shoping__cart__item__close">
                      <span class="icon_close"></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="shoping__cart__btns">
              <a href="/home" class="primary-btn cart-btn">CONTINUE SHOPPING</a>
              <a href="#" class="primary-btn cart-btn cart-btn-right"
                ><span class="icon_loading"></span> Upadate Cart</a
              >
            </div>
          </div>
          <div class="col-lg-6">
            <div class="shoping__continue">
              <div class="shoping__discount">
                <h5>Discount Codes</h5>
                <form action="#">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit" class="site-btn">APPLY COUPON</button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="shoping__checkout">
              <h5>Cart Total</h5>
              <ul>
                <li>Subtotal <span>$0</span></li>
                <li>
                  Total <span>${{ total }}</span>
                </li>
              </ul>
              <router-link :to="{ name: 'checkout' }" class="primary-btn">
                PROCEED TO CHECKOUT
              </router-link>
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

export default {
  name: "Cart",
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
      price: 30,
      orderID1: null,
      total: 0,
    };
  },
  created() {
    this.getListCartItem();
    this.orderID1 = this.orderID;
  },
  watch: {
    listCart1() {
      this.total = this.listCart1.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.price * currentValue.quantity,
        0
      );
    },
    success() {
      if (this.success) {
        this.$toaster.success(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
        this.getListCartItem();
        this.orderID1 = this.orderID;
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
    ...mapGetters([
      "listCart",
      "message",
      "success",
      "error",
      "listOrderByID",
      "orderID",
      "listCart1",
    ]),
  },
  methods: {
    ...mapActions({ getListCart: "getListCart" }),
    ...mapActions({ getListOrderByUserID: "getListOrderByUserID" }),
    ...mapActions({ getListCartItem: "getListCartItem" }),
    ...mapActions({ deleteCart: "deleteCart" }),
    removeCart(id) {
      this.deleteCart(id);
    },
  },
};
</script>
