<template>
  <div class="home">
    <div class="menu">
      <div class="margin-auto">
        <div class="d-flex justify-content-between">
          <div class="menu-left">
            <div class="layout-category">
              <div class="header">
                <img src="../../assets/img/bar.png" alt="" />
                <p>DANH MỤC SẢN PHẨM</p>
              </div>
              <div class="category">
                <ul class="list-category">
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Hải sản
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Rau Củ
                      Sạch
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Trái cây
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Thực phẩm
                      khô và đồ hộp
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Nước Giải
                      Khát
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Sữa - Sữa
                      Chua - Kem
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Bia - Rượu
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Nước Giặt
                      - Nước Xả - Nước Rửa Chén - Chất Tẩy Rửa
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Bánh Kẹo
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Gia vị -
                      Phụ gia
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Hóa Mỹ
                      Phẩm
                    </router-link>
                  </li>
                  <li class="category-item">
                    <router-link :to="{ name: 'home' }">
                      <img src="../../assets/img/haisan.jpg" alt="" />Khăn Giấy
                      - Giấy Vệ Sinh - Băng Vệ Sinh
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="menu-right flex-menu">
            <ul>
              <li>
                <router-link :to="{ name: 'home' }">
                  <span
                    ><img src="../../assets/img/hot.png" alt="" />Khuyến mãi
                    hot</span
                  >
                </router-link>
              </li>

              <li>
                <router-link :to="{ name: 'home' }">
                  <span>Hệ thống cửa hàng</span>
                </router-link>
              </li>

              <li>
                <router-link :to="{ name: 'home' }">
                  <span>Sản phẩm bán chạy</span>
                </router-link>
              </li>

              <li>
                <router-link :to="{ name: 'home' }">
                  <span>Mẹo vặt</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="slide_show">
      <div class="margin-auto">
        <div class="box-slider">
          .<CCarousel controls>
            <CCarouselItem>
              <img
                class="d-block w-100"
                src="../../assets/img/slide1.jpg"
                alt="slide 1"
              />
            </CCarouselItem>
            <CCarouselItem>
              <img
                class="d-block w-100"
                src="../../assets/img/slide2.jpg"
                alt="slide 2"
              />
            </CCarouselItem>
            <CCarouselItem>
              <img
                class="d-block w-100"
                src="../../assets/img/slide3.jpg"
                alt="slide 3"
              />
            </CCarouselItem>
          </CCarousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
