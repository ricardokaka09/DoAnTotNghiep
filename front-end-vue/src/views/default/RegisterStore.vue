<template>
  <div class="card-content">
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
  methods: {
    registerStore() {
      const formData = {
        email: this.email,
        description: this.description,
        store_name: this.store_name,
        address: this.address,
        phoneNumber: this.phoneNumber,
        logo: "",
        photos: [],
      };
      if (this.store_name !== "" || this.email !== "") {
        Api.requestServer1
          .post(`${process.env.VUE_APP_ROOT_API}/stores/register`, formData)
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
  },
};
</script>
