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
              <h2>Checkout</h2>
              <div class="breadcrumb__option">
                <router-link :to="{ name: 'home' }"> Home </router-link>
                <span>Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="checkout spad">
      <div class="container">
        <div class="checkout__form">
          <h4>Billing Details</h4>
          <form action="#">
            <div class="row">
              <div class="col-lg-8 col-md-6">
                <div class="checkout__input">
                  <p>Address<span>*</span></p>
                  <input
                    type="text"
                    placeholder="Address"
                    class="checkout__input__add"
                  />
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="checkout__input">
                      <p>Phone<span>*</span></p>
                      <input type="number" placeholder="Phone number" />
                    </div>
                  </div>
                </div>
                <div class="checkout__input">
                  <p>Order notes<span>*</span></p>
                  <input
                    type="text"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="checkout__order">
                  <h4>Your Order</h4>
                  <div class="checkout__order__products">
                    Products <span>Total</span>
                  </div>
                  <ul v-for="(item, index) in listCart1" :key="index">
                    <li>
                      {{ item.name }}
                      <span>${{ item.price * item.quantity }}</span>
                    </li>
                  </ul>
                  <div class="checkout__order__subtotal">
                    Subtotal <span>$0</span>
                  </div>
                  <div class="checkout__order__total">
                    Total <span>${{ total }}</span>
                  </div>
                  <!-- <div class="checkout__input__checkbox">
                    <label for="acc-or">
                      Create an account?
                      <input type="checkbox" id="acc-or" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adip elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div class="checkout__input__checkbox">
                    <label for="payment">
                      Check Payment
                      <input type="checkbox" id="payment" />
                      <span class="checkmark"></span>
                    </label>
                  </div> -->
                  <div class="checkout__input__checkbox">
                    <label for="paypal">
                      Payment on delivery
                      <input type="checkbox" id="paypal" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <b-button class="site-btn" v-on:click="createNewCheckout()">
                    PLACE ORDER
                  </b-button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgBreadcrumb from "../../assets/img/breadcrumb.jpg";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Checkout",
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
      price: 30,
      total: 0,
    };
  },
  created() {
    this.getListCartItem();
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
    ...mapActions({ createCheckout: "createCheckout" }),
    createNewCheckout() {
      // eslint-disable-next-line no-debugger
      debugger;
      const formData = {
        storeID: "b0bc9d0e-7504-4f5d-87a7-d0bf8f0f50a2",
        userID: "02121735-8cac-4c06-9bac-324626f28494",
        orderID: this.listCart1[0].orderID,
        amount: this.total,
        originAmount: 10,
        percentFee: 0,
        fixedFee: 10,
        manualFee: 10,
        fee: 10,
        type: "1",
        status: "CUSTOMER_CANCELED",
      };
      this.createCheckout(formData);
    },
  },
};
</script>
