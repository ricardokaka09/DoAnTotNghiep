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
              <h2>Contact Us</h2>
              <div class="breadcrumb__option">
                <router-link :to="{ name: 'home' }"> Home </router-link>
                <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-3 col-sm-6 text-center">
            <div class="contact__widget">
              <span><b-icon icon="phone" aria-hidden="true"></b-icon></span>
              <h4>Phone</h4>
              <p>+84-987654321</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 text-center">
            <div class="contact__widget">
              <span><b-icon icon="geo-alt" aria-hidden="true"></b-icon></span>
              <h4>Address</h4>
              <p>DaNang, Vietnam</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 text-center">
            <div class="contact__widget">
              <span><b-icon icon="clock" aria-hidden="true"></b-icon></span>
              <h4>Open time</h4>
              <p>24/7</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 text-center">
            <div class="contact__widget">
              <span><b-icon icon="mailbox" aria-hidden="true"></b-icon></span>
              <h4>Email</h4>
              <p>vku@udn.vn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact-form">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="contact__form__title">
              <h2>Leave Message</h2>
            </div>
          </div>
        </div>
        <form action="#">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <input type="text" placeholder="Your name" />
            </div>
            <div class="col-lg-6 col-md-6">
              <input type="text" placeholder="Your Email" />
            </div>
            <div class="col-lg-12 text-center">
              <textarea placeholder="Your message"></textarea>
              <button type="submit" class="site-btn">SEND MESSAGE</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import imgBreadcrumb from "../../assets/img/breadcrumb.jpg";
export default {
  name: "Contact",
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
    };
  },
};
</script>
