<template>
  <div class="footer-default">
    <div class="footer-top">
      <div class="margin-auto">
        <div class="footer-content">
          <div class="content-item">
            <div class="title"><p>MENU</p></div>
            <router-link :to="{ name: 'home' }" class="link-item">
              Trang chủ
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Sản phẩm
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Hệ Thống cửa hàng
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Tin Tức
            </router-link>
          </div>
          <div class="content-item">
            <div class="title"><p>THÔNG TIN HỮU ÍCH</p></div>
            <router-link :to="{ name: 'home' }" class="link-item">
              Giao nhận hàng
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Hình thức thanh toán
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Chính sách đổi trả hàng
            </router-link>
          </div>
          <div class="content-item">
            <div class="title"><p>GIỚI THIỆU</p></div>
            <router-link :to="{ name: 'home' }" class="link-item">
              Về Dịch vụ Đi chợ Thuê
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Chính Sách Bảo Mật
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Tuyển Dụng
            </router-link>
          </div>
          <div class="content-item">
            <div class="title"><p>SẢN PHẨM BÁN CHẠY</p></div>
            <router-link :to="{ name: 'home' }" class="link-item">
              Cải Ngông
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Cà Chua
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Cài Thìa
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Cải Ngọt
            </router-link>
            <router-link :to="{ name: 'home' }" class="link-item">
              Cải Xanh
            </router-link>
          </div>
          <div class="content-item-sns">
            <div class="title"><p>MẠNG XÃ HỘI</p></div>
            <div class="sns">
              <router-link :to="{ name: 'home' }" class="link-item">
                Facebook
              </router-link>
              <router-link :to="{ name: 'home' }" class="link-item">
                Twitter
              </router-link>
              <router-link :to="{ name: 'home' }" class="link-item">
                Youtube
              </router-link>
              <router-link :to="{ name: 'home' }" class="link-item">
                Instagram
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container d-flex justify-content-center">
        <div class="logo-footer col-md-4 col-4">
          <router-link :to="{ name: 'home' }">
            <img src="../../assets/img/logo3.png" alt="" />
          </router-link>
        </div>
        <div class="info-footer col-md-6 col-6">
          <p>
            <span style="font-size: 18px"
              ><strong>CÔNG TY TNHH DỊCH VỤ ĐI CHỢ THUÊ</strong></span
            >
          </p>

          <p>
            <strong>Địa chỉ</strong>&nbsp;: 18A Sông Nhuệ, Phường 2, Quận Tân
            Bình, Hồ Chí Minh
          </p>

          <p>
            <strong>Chi nhánh:&nbsp;</strong>171 Nguyễn Phúc Chu, P. 15, Q. Tân
            Bình, Hồ Chí Minh
          </p>

          <p><strong>Hotline</strong>: 0987 399 479</p>

          <p><strong>Email</strong>: randotghsv@gmail.com</p>

          <p>
            <strong>Website</strong>:&nbsp;https://dichothue.com.vn/ -
            https://haisanrando.com/
          </p>

          <p><strong>Webdesign</strong>:&nbsp;https://chily.vn/</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
