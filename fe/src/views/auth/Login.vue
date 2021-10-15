<template>
  <div class="form-login">
    <CRow class="h-100">
      <CCol sm="5" class="h-100">
        <div class="d-flex justify-content-center align-items-center h-100">
          <img
            class="img-fluid"
            src="../../assets/img/login-img.png"
            alt="login-img"
          /></div></CCol
      ><CCol sm="7" class="h-100"
        ><div
          class="
            form-main
            d-flex
            justify-content-center
            align-items-center
            h-100
            flex-column
          "
        >
          <div class="title">Log in to your account</div>
          <div class="form w-100 px-4 py-4">
            <CInput
              class="form-input"
              label="Email"
              placeholder="Email@mail.com"
              :isValid="isEmailValid"
              :invalidFeedback="emailFeedback"
              v-model="email"
            />
            <CInput
              class="form-input"
              label="Password"
              type="password"
              placeholder="Password"
              v-model="password"
              :isValid="isPasswordValid"
              :invalidFeedback="passwordFeedback"
            />
            <div class="remember-form">
              <input
                v-model="remember_me"
                type="checkbox"
                name="remember"
                id="remember"
              />
              <label class="ml-1" for="remember">Remember Password</label>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <CButton v-on:click.prevent="submitLogin()" :color="'info'">
              Sign In
            </CButton>
          </div>
          <div class="d-flex justify-content-center my-3">
            <p class="link-forgot mx-4">
              <router-link :to="{ name: 'forgot password' }"
                >Forgot Password</router-link
              >
            </p>
            <p class="link-create-member mx-4">
              <router-link :to="{ name: 'create member' }">
                Create New Account
              </router-link>
            </p>
          </div>
        </div></CCol
      ></CRow
    >
  </div>
</template>

<script>
import { Constants } from "../../utils/constants";
import { Api } from "../../utils/http-common";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isPasswordValid: null,
      isEmailValid: null,
      emailFeedback: "",
      passwordFeedback: "",
      remember_me: false,
    };
  },
  watch: {
    email() {
      this.isEmailValid = null;
    },
    password() {
      this.isPasswordValid = null;
    },
  },
  methods: {
    submitLogin() {
      const formLogin = {
        email: this.email,
        password: this.password,
        remember_me: this.remember_me,
      };
      if (this.password !== "" || this.email !== "") {
        Api.requestServer1
          .post(`http://localhost:3000/users/login`, formLogin)
          .then((response) => {
            const { data } = response;
            // eslint-disable-next-line no-debugger
            debugger;
            if (data.status === "ACTIVE") {
              const { accessToken } = data;
              localStorage.setItem(Constants.TOKEN, accessToken);
              this.getInfoUser();
            } else {
              console.log("sai pw");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("lỗi");
      }
    },
    getInfoUser() {
      Api.requestServer1
        .get(`http://localhost:3000/users/me/info`)
        .then((response) => {
          const { data } = response;
          // eslint-disable-next-line no-debugger
          debugger;
          localStorage.setItem(Constants.USER_TYPE, data.access[0].roleName);
          if (data.access[0].roleName === 0) {
            this.$router.push({ name: "dashboard master" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
