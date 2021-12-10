<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-10 col-sm-10 col-md-9 auth-form">
      <div class="row h-100 form-login">
        <div class="col-md-5 h-100 d-none d-md-block">
          <div
            class="h-100 d-flex justify-content-center align-items-center logo"
          >
            <img :src="loginImg" class="w-75" />
          </div>
        </div>
        <div class="col-md-7 col-sm-12 h-100">
          <div
            class="d-flex justify-content-center align-items-center w-100 h-100"
          >
            <div class="w-75 d-flex flex-column align-items-center">
              <div class="pb-3 d-flex justify-content-center">
                <h4>Đăng ký thành viên</h4>
              </div>
              <div class="w-100 pl-xl-4 pr-xl-4 pl-0 pr-0">
                <CInput
                  placeholder="Email"
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  class="form-input"
                >
                  <template #prepend-content
                    ><b-icon icon="person" aria-hidden="true"></b-icon
                  ></template>
                </CInput>
              </div>
              <div class="w-100 pl-xl-4 pr-xl-4 pl-0 pr-0">
                <CInput
                  placeholder="Mật khẩu"
                  v-model="password"
                  type="password"
                  autocomplete="password"
                  class="form-input"
                >
                  <template #prepend-content
                    ><b-icon icon="lock" aria-hidden="true"></b-icon
                  ></template>
                </CInput>
              </div>
              <div class="w-100 pl-xl-4 pr-xl-4 pl-0 pr-0">
                <CInput
                  placeholder="Xác nhận Mật khẩu"
                  v-model="confirmPassword"
                  type="password"
                  autocomplete="confirmPassword"
                  class="form-input"
                >
                  <template #prepend-content
                    ><b-icon icon="lock" aria-hidden="true"></b-icon
                  ></template>
                </CInput>
              </div>
              <div class="w-100 pl-xl-4 pr-xl-4 pl-0 pr-0 btn-submit">
                <CButton class="px-4" type="submit" v-on:click="submitLogin()"
                  >Đăng ký</CButton
                >
              </div>
              <div
                class="w-100 pl-xl-4 pr-xl-4 pl-0 pr-0 btn-submit text-center"
              >
                <div class="link-forgot">
                  <router-link :to="{ name: 'login' }"> Đăng Nhập </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Constants } from "../../utils/constants";
import { Api } from "../../utils/http-common";
import { Urls } from "../../utils/urls";
import loginImg from "../../assets/img/login-img.png";
export default {
  name: "RegisterUser",
  data() {
    return {
      email: "",
      password: "",
      loginImg: loginImg,
      confirmPassword: "",
    };
  },
  created() {
    const token = localStorage.getItem(Constants.TOKEN);
    const role = localStorage.getItem(Constants.ROLE);
    console.log(role);
    if (token) {
      const role = localStorage.getItem(Constants.ROLE);
      if (parseInt(role) === 0) {
        this.$router.push({ name: "dashboard admin" });
      } else {
        this.$router.push({ name: "home" });
      }
    }
  },
  methods: {
    submitLogin() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      if (this.email == "") {
        this.$toaster.error("Vui lòng nhập email của bạn");
      } else if (this.password == "") {
        this.$toaster.error("Vui lòng nhập password của bạn");
      } else if (this.confirmPassword == "") {
        this.$toaster.error("Vui lòng nhập lại password của bạn");
      } else if (this.confirmPassword !== this.password) {
        this.$toaster.error("Password không khớp");
      } else {
        Api.requestServer1
          .post(`${Urls.USERS}/${Urls.REGISTER}`, formData)
          .then((response) => {
            const { data } = response;
            console.log(data);
            if (data === true) {
              this.$router.push({ name: "login" });
              this.$toaster.success("Bạn đã đăng ký thành công");
            } else {
              this.$toaster.error("Đăng ký không thành công");
            }
          })
          .catch((error) => {
            if (error.response) {
              this.$toaster.error(error.response.data.message);
            } else {
              console.log(error);
            }
          });
      }
    },
  },
};
</script>
