<template>
  <div class="home d-flex">
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
    <!-- <div class="slide_show">
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
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss">
.home {
  .menu {
    width: 100%;
    background: #006a14;
    .menu-left {
      width: 240px;
      position: relative;
      height: 42px;
      cursor: pointer;
      display: flex;
      z-index: 99;
      .layout-category {
        position: relative;
        z-index: 99;
        top: 0px;
        display: flex;
        width: 100%;
        background: #f36523;
        .header {
          text-transform: uppercase;
          position: relative;
          font-size: 15px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          font-weight: 700;
          padding: 0px 10px;
          img {
            margin-right: 15px;
          }
          p {
            margin: unset !important;
          }
        }
        .category {
          position: absolute;
          top: 42px;
          display: block;
          transition: 1s;
          width: 100%;
          height: 368px;

          .list-category::-webkit-scrollbar-track {
            padding: 2px 0;
          }
          .list-category::-webkit-scrollbar {
            width: 4px;
          }

          .list-category::-webkit-scrollbar-thumb {
            background-color: #c4c4c4;
          }
          .list-category {
            list-style: none;
            padding-left: 0px;
            background: #fff;
            border: 1px solid #cccccc;
            overflow-y: auto;
            height: 368px;
            .category-item {
              border-bottom: 1px solid #cccccc;
              padding: 0px 0px;
              border-top: none;

              &:hover {
                color: #fff;
                background: #4caf50;
              }
              a {
                color: #333;
                font-size: 13px;
                display: flex;
                align-items: center;
                position: relative;
                padding: 10px 10px 10px 10px;
                &:hover {
                  color: #fff;
                  text-decoration: none;
                }
                img {
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
    }
    .menu-right {
      background: transparent;
      height: 42px;
      line-height: 42px;
      width: calc(100% - 240px);
      transition: all 0.6s ease;
      ul {
        width: 100%;
        padding: unset !important;
        li {
          float: left;
          position: relative;
          z-index: 99;
          padding: 0px 0px;
          list-style-type: none;
          a {
            color: #fff;
            font-size: 13px;
            padding: 0px 20px;
            text-transform: uppercase;
            display: block;
            font-weight: 600;
            &:hover {
              color: #fff;
              background: rgba(0, 0, 0, 0.2);
              text-decoration: none;
            }
            img {
              width: 20px;
              display: inline-block;
              margin-right: 5px;
              margin-top: -6px;
            }
          }
        }
      }
    }
  }
}
.slide_show {
  .margin-auto {
    .box-slider {
    }
  }
}
.card-content {
  padding: 50px 200px;
}
.margin-auto {
  max-width: 1277px;
  margin: 0 auto;
  padding: 0px 10px;
}
</style>
