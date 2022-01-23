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
                  <ul>
                    <li>Vegetable’s Package <span>$75.99</span></li>
                    <li>Fresh Vegetable <span>$151.99</span></li>
                    <li>Organic Bananas <span>$53.99</span></li>
                  </ul>
                  <div class="checkout__order__subtotal">
                    Subtotal <span>$750.99</span>
                  </div>
                  <div class="checkout__order__total">
                    Total <span>$750.99</span>
                  </div>
                  <div class="checkout__input__checkbox">
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
                  </div>
                  <div class="checkout__input__checkbox">
                    <label for="paypal">
                      Paypal
                      <input type="checkbox" id="paypal" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <button type="submit" class="site-btn">PLACE ORDER</button>
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
import { Constants } from "../../utils/constants";
export default {
  name: "Checkout",
  created() {
    const token = localStorage.getItem(Constants.TOKEN);
    if (!token) {
      this.$router.push({ name: "login user" });
    }
  },
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
    };
  },
};
</script>
