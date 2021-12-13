<template>
  <div class="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="hero__categories">
            <div class="hero__categories__all">
              <span>All</span>
            </div>
            <ul>
              <li><a href="#">Fresh Meat</a></li>
              <li><a href="#">Vegetables</a></li>
              <li><a href="#">Fruit & Nut Gifts</a></li>
              <li><a href="#">Fresh Berries</a></li>
              <li><a href="#">Ocean Foods</a></li>
              <li><a href="#">Butter & Eggs</a></li>
              <li><a href="#">Fastfood</a></li>
              <li><a href="#">Fresh Onion</a></li>
              <li><a href="#">Papayaya & Crisps</a></li>
              <li><a href="#">Oatmeal</a></li>
              <li><a href="#">Fresh Bananas</a></li>
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
export default {
  name: "Hero",
  data() {
    return {
      bannerImg: bannerImg,
    };
  },
};
</script>
