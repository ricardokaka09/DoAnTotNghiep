<template>
  <div class="form-login">
    <CRow class="h-100"
      ><CCol sm="12" class="h-100"
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
          <div class="title">Đăng ký vào hệ thống</div>
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
              label="Username"
              placeholder="Username"
              :isValid="isUsernameValid"
              :invalidFeedback="usernameFeedback"
              v-model="username"
            />
            <CInput
              class="form-input"
              label="Mật Khẩu"
              type="password"
              placeholder="Mật Khẩu"
              v-model="password"
              :isValid="isPasswordValid"
              :invalidFeedback="passwordFeedback"
            />
            <CInput
              class="form-input"
              label="Nhập lại Mật Khẩu"
              type="password"
              placeholder="Nhập lại Mật Khẩu"
              v-model="confirmPassword"
              :isValid="isConfirmPasswordValid"
              :invalidFeedback="confirmPasswordFeedback"
            />

            <CButton
              v-on:click.prevent="submitRegister()"
              :color="'success'"
              class="w-100 my-2"
            >
              Đăng ký
            </CButton>
          </div>
          <div class="d-flex justify-content-center mb-4">
            <p class="link-forgot">
              <router-link :to="{ name: 'login' }">Đăng nhập</router-link>
            </p>
          </div>
        </div></CCol
      ></CRow
    >
  </div>
</template>

<script>
import { Api } from "../../utils/http-common";
export default {
  name: "RegisterUser",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      isUsernameValid: null,
      isPasswordValid: null,
      isEmailValid: null,
      isConfirmPasswordValid: null,
      emailFeedback: "",
      usernameFeedback: "",
      passwordFeedback: "",
      confirmPasswordFeedback: "",
      remember_me: false,
    };
  },
  created() {},
  watch: {
    email() {
      this.isEmailValid = null;
    },
    username() {
      this.isUsernameValid = null;
    },
    password() {
      this.isPasswordValid = null;
      if (this.password === this.confirmPassword) {
        this.isConfirmPassword = true;
      } else {
        this.isConfirmPassword = false;
      }
    },
    confirmPassword() {
      this.isConfirmPasswordValid = null;
      if (this.password === this.confirmPassword) {
        this.isConfirmPassword = true;
      } else {
        this.isConfirmPassword = false;
      }
    },
  },
  methods: {
    submitRegister() {
      // eslint-disable-next-line no-debugger
      debugger;
      if (this.email === "") {
        this.isEmailValid = false;
        this.emailFeedback = "Vui lòng nhập email";
      } else if (this.password === "") {
        this.isPasswordValid = false;
        this.passwordFeedback = "Vui lòng nhập mật khẩu";
      } else if (this.confirmPassword === "") {
        this.isConfirmPasswordValid = false;
        this.confirmPasswordFeedback = "Vui lòng nhập lại mật khẩu";
      } else if (this.confirmPassword !== this.password) {
        this.isConfirmPasswordValid = false;
        this.confirmPasswordFeedback = "Mật khẩu không khớp";
      } else if (this.username === "") {
        this.isUsernameValid = false;
        this.usernameFeedback = "Vui lòng nhập username";
      } else {
        const formRegister = {
          email: this.email,
          password: this.password,
          fullName: this.username,
        };
        Api.requestServer1
          .post(`${process.env.VUE_APP_ROOT_API}/users/register`, formRegister)
          .then((response) => {
            const { data } = response;
            console.log(data);
            if (data === true) {
              this.$toaster.success(
                "Bạn đã đăng ký thành công, vui lòng kiểm tra email"
              );
              this.$store.commit("set", ["success", false]);
              this.$store.commit("set", ["message", ""]);
              this.$router.push({ name: "login" });
            } else {
              this.$toaster.error("Đăng ký không thành công");
              this.$store.commit("set", ["message", ""]);
              this.$store.commit("set", ["error", false]);
              this.email = "";
              this.password = "";
              this.confirmPassword = "";
              this.username = "";
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
