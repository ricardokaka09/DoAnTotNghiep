<template>
  <div class="card-content" style="padding: 50px 100px">
    <CCard>
      <CCardHeader>
        <h4>Register Store</h4>
      </CCardHeader>
      <CCardBody>
        <div>
          <CRow>
            <CCol sm="6">
              <CInput
                label="Email"
                placeholder="Email@mail.com"
                v-model="email"
              />
            </CCol>
            <CCol sm="6">
              <CInput
                label="Store Name"
                placeholder="Store Name"
                v-model="store_name"
              />
            </CCol>
            <CCol sm="12">
              <CInput
                label="Description"
                placeholder="Description"
                v-model="description"
              />
            </CCol>
            <CCol sm="6">
              <CInput
                label="Phone"
                placeholder="0XX-XXX-XXXX"
                v-model="phoneNumber"
              />
            </CCol>
            <CCol sm="6">
              <CInput label="Address" v-model="address" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <div class="d-flex justify-content-center">
                <CButton
                  :color="'success'"
                  :size="'lg'"
                  class="mt-3"
                  v-on:click.prevent="registerStore()"
                >
                  Register Store
                </CButton>
              </div>
            </CCol>
          </CRow>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { Constants } from "../../utils/constants";
import { Api } from "../../utils/http-common";
import { Urls } from "../../utils/urls";
export default {
  name: "RegisterStore",
  data() {
    return {
      email: "",
      store_name: "",
      address: "",
      description: "",
      phoneNumber: "",
    };
  },
  created() {
    const token = localStorage.getItem(Constants.TOKEN);
    if (token) {
      const role = localStorage.getItem(Constants.ROLE);
      if (parseInt(role) === 0) {
        this.$router.push({ name: "dashboard admin" });
      } else if (parseInt(role) === 2) {
        this.$router.push({ name: "DashboardStore" });
      } else if (parseInt(role) === 3) {
        this.$router.push({ name: "register store" });
      } else {
        this.$router.push({ name: "home" });
      }
    }
  },
  methods: {
    registerStore() {
      const formData = {
        email: this.email,
        description: this.description,
        name: this.store_name,
        address: this.address,
        phoneNumber: this.phoneNumber,
        logo: "",
        photos: [],
      };
      if (this.store_name == "") {
        this.$toaster.error("Vui lòng nhập tên store của bạn");
      } else if (this.email == "") {
        this.$toaster.error("Vui lòng nhập email của bạn");
      } else {
        Api.requestServer1
          .post(`${Urls.STORES}/${Urls.REGISTER}`, formData)
          .then((response) => {
            const { data } = response;
            console.log(data.statusCode);
            if (data.status === "UNVERIFIED") {
              this.$router.push({ name: "login user" });
              this.$toaster.success("Vui lòng chờ kiểm duyệt");
            } else {
              this.$toaster.success(
                "Vui lòng đăng nhập trước khi đăng ký store"
              );
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

<style lang="scss">
.form-control {
  padding-left: 20px !important;
}
</style>
