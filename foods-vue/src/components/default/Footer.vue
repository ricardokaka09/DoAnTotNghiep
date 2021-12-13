<template>
  <footer class="footer spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="footer__about">
            <div class="footer__about__logo">
              <a href="./index.html"><img src="img/logo.png" alt="" /></a>
            </div>
            <ul>
              <li>Address: Hoa Quy, Ngu Hanh Son, DaNang</li>
              <li>Phone: +84. 987 654 321</li>
              <li>Email: cs@vku.udn.vn</li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
          <div class="footer__widget">
            <h6>Useful Links</h6>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">About Our Shop</a></li>
              <li><a href="#">Secure Shopping</a></li>
              <li><a href="#">Delivery infomation</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Our Sitemap</a></li>
            </ul>
            <ul>
              <li><a href="#">Who We Are</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Innovation</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="footer__widget">
            <h6>Join Our Newsletter Now</h6>
            <p>Get E-mail updates about our latest shop and special offers.</p>
            <form action="#">
              <input type="text" placeholder="Enter your mail" />
              <button type="submit" class="site-btn">Subscribe</button>
            </form>
            <div class="footer__widget__social">
              <a href="#"
                ><font-awesome-icon
                  class="sidebar-icon"
                  :icon="['fab', 'facebook']"
              /></a>
              <a href="#"
                ><font-awesome-icon
                  class="sidebar-icon"
                  :icon="['fab', 'instagram']"
              /></a>
              <a href="#"
                ><font-awesome-icon
                  class="sidebar-icon"
                  :icon="['fab', 'twitter']"
              /></a>
              <a href="#"
                ><font-awesome-icon
                  class="sidebar-icon"
                  :icon="['fab', 'youtube']"
              /></a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="footer__copyright">
            <div class="footer__copyright__text">
              <p>Copyright &copy; 2021 All rights Flash Food</p>
            </div>
            <div class="footer__copyright__payment">
              <img src="img/payment-item.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  background: #f3f6fa;
  padding-top: 70px;
  padding-bottom: 0;
}

.footer__about {
  margin-bottom: 30px;
}

.footer__about ul li {
  font-size: 16px;
  color: #1c1c1c;
  line-height: 36px;
  list-style: none;
}

.footer__about__logo {
  margin-bottom: 15px;
}

.footer__about__logo a {
  display: inline-block;
}

.footer__widget {
  margin-bottom: 30px;
  overflow: hidden;
}

.footer__widget h6 {
  color: #1c1c1c;
  font-weight: 700;
  margin-bottom: 10px;
}

.footer__widget ul {
  width: 50%;
  float: left;
}

.footer__widget ul li {
  list-style: none;
}

.footer__widget ul li a {
  color: #1c1c1c;
  font-size: 14px;
  line-height: 32px;
}

.footer__widget p {
  font-size: 14px;
  color: #1c1c1c;
  margin-bottom: 30px;
}

.footer__widget form {
  position: relative;
  margin-bottom: 30px;
}

.footer__widget form input {
  width: 100%;
  font-size: 16px;
  padding-left: 20px;
  color: #1c1c1c;
  height: 46px;
  border: 1px solid #ededed;
}

.footer__widget form input::placeholder {
  color: #1c1c1c;
}

.footer__widget form button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 26px;
  height: 100%;
}

.footer__widget .footer__widget__social a {
  display: inline-block;
  height: 41px;
  width: 41px;
  font-size: 16px;
  color: #404040;
  border: 1px solid #ededed;
  border-radius: 50%;
  line-height: 38px;
  text-align: center;
  background: #ffffff;
  -webkit-transition: all, 0.3s;
  -moz-transition: all, 0.3s;
  -ms-transition: all, 0.3s;
  -o-transition: all, 0.3s;
  transition: all, 0.3s;
  margin-right: 10px;
}

.footer__widget .footer__widget__social a:last-child {
  margin-right: 0;
}

.footer__widget .footer__widget__social a:hover {
  background: #7fad39;
  color: #ffffff;
  border-color: #ffffff;
}

.footer__copyright {
  border-top: 1px solid #ebebeb;
  padding: 15px 0;
  overflow: hidden;
  margin-top: 20px;
}

.footer__copyright__text {
  font-size: 14px;
  color: #1c1c1c;
  float: left;
  line-height: 25px;
}

.footer__copyright__payment {
  float: right;
}
</style>
