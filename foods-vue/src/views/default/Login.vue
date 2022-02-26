<template>
  <div>
    <div
      class="row justify-content-center"
      style="border-top: 1px solid #c4c4c4"
    >
      <div class="col-md-7 col-lg-5">
        <div class="login-wrap p-4 p-md-5">
          <div class="d-flex">
            <div class="w-100">
              <h3 class="mb-4">Login</h3>
            </div>
          </div>
          <form action="#" class="login-form">
            <div class="form-group">
              <div
                class="icon d-flex align-items-center justify-content-center"
              >
                <b-icon icon="person" aria-hidden="true"></b-icon>
              </div>
              <input
                class="form-control rounded-left"
                placeholder="Email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
              />
            </div>
            <div class="form-group">
              <div
                class="icon d-flex align-items-center justify-content-center"
              >
                <b-icon icon="lock" aria-hidden="true"></b-icon>
              </div>
              <input
                type="password"
                v-model="password"
                class="form-control rounded-left"
                placeholder="Password"
                required
              />
            </div>
            <div class="form-group d-flex align-items-center">
              <div class="w-100 d-flex justify-content-end">
                <button
                  class="btn btn-primary rounded submit"
                  v-on:click.prevent="submitLogin()"
                >
                  Login
                </button>
              </div>
            </div>
            <div class="form-group mt-4">
              <div class="w-100 text-center">
                <p class="mb-1">
                  Don't have an account?
                  <router-link
                    :to="{ name: 'register user' }"
                    style="color: #1a1a1a"
                  >
                    Register
                  </router-link>
                </p>
                <p>Forgot Password</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Constants } from "../../utils/constants";
import { Api } from "../../utils/http-common";
import { Urls } from "../../utils/urls";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isRemember: false,
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
      } else if (parseInt(role) === 3) {
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
        Api.requestServer1
          .post(`${Urls.USERS}/${Urls.LOGIN}`, formLogin)
          .then((response) => {
            const { data } = response;
            if (data.status === "ACTIVE") {
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
        .get(`${Urls.USERS}/me`)
        .then((response) => {
          const { data } = response;
          const dataStore = data.accesses.filter(
            (item) => item.storeID !== null
          );
          console.log(dataStore);
          console.log(data.accesses);
          if (data.status === "ACTIVE") {
            const { userID } = data;

            localStorage.setItem(Constants.USER_ID, userID);
            if (dataStore.length > 0) {
              localStorage.setItem(Constants.ROLE, 2);
              this.$router.push({ name: "DashboardStore" });
              this.$toaster.success("Đăng nhập thành công");
            } else {
              localStorage.setItem(Constants.ROLE, 3);
              this.$router.push({ name: "home" });
              this.$toaster.success("Đăng nhập thành công");
            }
          } else {
            this.$toaster.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
//COVER BG
.img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.login-wrap {
  position: relative;
  background: #fff;
  border-radius: 5px;
  h3 {
    font-weight: 300;
  }
}

.form-group {
  position: relative;
  .icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    background: #7fad39;
    font-size: 20px;
    border-radius: 5px 0 0 5px;
    span {
      color: #fff;
    }
  }
}

//FORM CONTROL
.form-control {
  height: 48px;
  background: #fff;
  color: #000;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 60px !important;
  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none;
    border: 1px solid #7fad39;
  }
}

.social-media {
  position: relative;
  width: 100%;
  .social-icon {
    display: block;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 16px;
    margin-right: 5px;
    border-radius: 50%;
    span {
      color: lighten(#000, 60%);
    }
    &:hover,
    &:focus {
      background: #7fad39;
      span {
        color: #fff;
      }
    }
  }
}

//CHECKBOX STYLE
.checkbox-wrap {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-wrap input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "\f0c8";
  font-family: "FontAwesome";
  position: absolute;
  color: rgba(0, 0, 0, 0.1);
  font-size: 20px;
  margin-top: -4px;
}

/* Show the checkmark when checked */
.checkbox-wrap {
  input:checked ~ .checkmark:after {
    display: block;
    content: "\f14a";
    font-family: "FontAwesome";
    color: rgba(0, 0, 0, 0.2);
  }
}

/* Style the checkmark/indicator */
.checkbox-wrap .checkmark:after {
}

.checkbox-primary {
  color: #7fad39;
  input:checked ~ .checkmark:after {
    color: #7fad39;
  }
}

//BUTTON
.btn {
  cursor: pointer;
  box-shadow: none !important;
  font-size: 15px;
  padding: 10px 20px;
  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
  &.btn-primary {
    background: #7fad39 !important;
    border: 1px solid #7fad39 !important;
    color: #fff !important;
    &:hover {
      border: 1px solid #7fad39;
      background: transparent;
      color: #7fad39;
    }
    &.btn-outline-primary {
      border: 1px solid #7fad39;
      background: transparent;
      color: #7fad39;
      &:hover {
        border: 1px solid transparent;
        background: #7fad39;
        color: #fff;
      }
    }
  }
}
</style>
