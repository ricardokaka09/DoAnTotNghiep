<template>
  <div class="banner">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="banner__pic">
            <img :src="Banner1" alt="" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="banner__pic">
            <img :src="Banner2" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner1 from "../../assets/img/banner/banner-1.jpg";
import Banner2 from "../../assets/img/banner/banner-2.jpg";
export default {
  name: "Banner",
  data() {
    return {
      Banner1: Banner1,
      Banner2: Banner2,
    };
  },
};
</script>
