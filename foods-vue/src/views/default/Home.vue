<template>
  <div class="home">
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
                  <button
                    type="submit"
                    class="site-btn"
                    style="border-radius: 0 30px 30px 0"
                  >
                    SEARCH
                  </button>
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
    <Category />
    <FeaturedProduct />
  </div>
</template>

<script>
import bannerImg from "../../assets/img/hero/banner.jpg";
import Category from "../../components/default/Category.vue";
import FeaturedProduct from "../../components/default/FeaturedProduct.vue";
export default {
  name: "Home",
  components: {
    Category,
    FeaturedProduct,
  },
  data() {
    return {
      bannerImg: bannerImg,
    };
  },
};
</script>

<style lang="scss">
.hero {
  padding-bottom: 50px;
}

.hero.hero-normal {
  padding-bottom: 30px;
}

.hero.hero-normal .hero__categories {
  position: relative;
}

.hero.hero-normal .hero__categories ul {
  display: none;
  position: absolute;
  left: 0;
  top: 46px;
  width: 100%;
  z-index: 9;
  background: #ffffff;
}

.hero.hero-normal .hero__search {
  margin-bottom: 0;
}

.hero__categories__all {
  background: #7fad39;
  position: relative;
  padding: 10px 25px 10px 40px;
  cursor: pointer;
}

.hero__categories__all i {
  font-size: 16px;
  color: #ffffff;
  margin-right: 10px;
}

.hero__categories__all span {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

.hero__categories ul {
  border: 1px solid #ebebeb;
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 12px;
}

.hero__categories ul li {
  list-style: none;
}

.hero__categories ul li a {
  font-size: 16px;
  color: #1c1c1c;
  line-height: 39px;
  display: block;
}

.hero__search {
  overflow: hidden;
  margin-bottom: 30px;
}

.hero__search__form {
  width: 610px;
  height: 50px;
  border: 1px solid #ebebeb;
  position: relative;
  float: left;
  border-radius: 0 30px 30px 0;
}

.hero__search__form form .hero__search__categories {
  width: 30%;
  float: left;
  font-size: 16px;
  color: #1c1c1c;
  font-weight: 700;
  padding-left: 18px;
  padding-top: 11px;
  position: relative;
}

.hero__search__form form .hero__search__categories:after {
  position: absolute;
  right: 0;
  top: 14px;
  height: 20px;
  width: 1px;
  background: #000000;
  opacity: 0.1;
  content: "";
}

.hero__search__form form .hero__search__categories span {
  position: absolute;
  right: 14px;
  top: 14px;
}

.hero__search__form form input {
  width: 70%;
  border: none;
  height: 48px;
  font-size: 16px;
  color: #b2b2b2;
  padding-left: 20px;
}

.hero__search__form form input::placeholder {
  color: #b2b2b2;
}

.hero__search__form form button {
  position: absolute;
  right: 0;
  top: -1px;
  height: 50px;
}

.hero__search__phone {
  float: right;
}

.hero__search__phone__icon {
  font-size: 18px;
  color: #7fad39;
  height: 50px;
  width: 50px;
  background: #f5f5f5;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  float: left;
  margin-right: 20px;
}

.hero__search__phone__text {
  overflow: hidden;
}

.hero__search__phone__text h5 {
  color: #1c1c1c;
  font-weight: 700;
  margin-bottom: 5px;
}

.hero__search__phone__text span {
  font-size: 14px;
  color: #6f6f6f;
}

.hero__item {
  height: 431px;
  display: flex;
  align-items: center;
  padding-left: 75px;
}

.hero__text span {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 4px;
  color: #7fad39;
}

.hero__text h2 {
  font-size: 46px;
  color: #252525;
  line-height: 52px;
  font-weight: 700;
  margin: 10px 0;
}

.hero__text p {
  margin-bottom: 35px;
}
</style>
