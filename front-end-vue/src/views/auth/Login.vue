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
                <h4>Đăng nhập</h4>
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
              <div class="w-100 pl-xl-4 pr-xl-4 pl-0 pr-0 ml-5">
                <CInputCheckbox v-model="isRemember" label="Ghi nhớ mật khẩu" />
              </div>
              <div class="w-100 pl-xl-4 pr-xl-4 pl-0 pr-0 btn-submit">
                <CButton class="px-4" type="submit" v-on:click="submitLogin()"
                  >Đăng nhập</CButton
                >
              </div>
              <div class="w-100 pl-xl-4 pr-xl-4 pl-0 pr-0 btn-submit d-flex">
                <div class="link-forgot mx-2">
                  <router-link :to="{ name: 'register user' }">
                    Đăng ký
                  </router-link>
                </div>
                <div class="link-forgot mx-2">
                  <a href="">Quên mật khẩu</a>
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
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isRemember: false,
      loginImg: loginImg,
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
      const formLogin = {
        email: this.email,
        password: this.password,
      };
      if (this.password !== "" && this.email !== "") {
        // eslint-disable-next-line no-debugger
        debugger;
        Api.requestServer1
          .post(`${Urls.USERS}/${Urls.LOGIN}`, formLogin)
          .then((response) => {
            const { data } = response;
            if (data.status === "ACTIVE" || data.status === "INACTIVE") {
              const { accessToken } = data;
              localStorage.setItem(Constants.TOKEN, accessToken);
              this.getInfoUser();
            } else {
              this.$toaster.error(data.message);
            }
          })
          .catch((error) => {
            if (error.response) {
              this.$toaster.error(error.response.data.message);
            } else {
              console.log(error);
            }
          });
      } else {
        this.$toaster.error("Vui lòng nhập email và mật khẩu của bạn");
      }
    },
    getInfoUser() {
      Api.requestServer1
        .get(`${Urls.USERS}/me/info`)
        .then((response) => {
          const { data } = response;
          localStorage.setItem(Constants.ROLE, data.access[0].roleName);
          if (data.access[0].roleName === 0) {
            this.$router.push({ name: "dashboard admin" });
          } else if (data.access[0].roleName === 3) {
            this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
