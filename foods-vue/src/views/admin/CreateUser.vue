<template>
  <div>
    <CCard>
      <CCardBody>
        <div class="create-user">
          <div class="box-title d-flex justify-content-between">
            <h1 class="title">Thêm người dùng mới</h1>
          </div>
          <div class="px-3 py-2">
            <CRow>
              <CCol sm="4">
                <div class="avatar-creat">
                  <img style="width: 200px; height: 200px" />
                  <CRow
                    ><b-form-group
                      id="input-group-8"
                      label="Chọn ảnh đại diện:"
                      label-for="input-8"
                      class="d-flex flex-column mx-3 my-2"
                    >
                      <b-form-file v-model="image" plain></b-form-file>
                    </b-form-group>
                  </CRow>
                </div>
              </CCol>
              <CCol sm="8">
                <CRow>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">ID</label>
                    <CInput type="text" v-model="id" />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Username</label>
                    <CInput type="text" v-model="username" />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Họ và tên đệm</label>
                    <CInput type="text" v-model="first_name" />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Tên</label>
                    <CInput type="text" v-model="last_name" />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Email</label>
                    <CInput type="email" v-model="email" />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Mật khẩu</label>
                    <CInput type="password" v-model="password" />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Số điện thoại</label>
                    <CInput type="text" v-model="phone_number" />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Địa chỉ</label>
                    <CInput type="text" v-model="address" />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Giới tính</label>
                    <CSelect
                      horizontal
                      :options="sex"
                      placeholder="Chọn giới tính"
                      style="width: 487px"
                    />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Ngày sinh</label>
                    <date-picker
                      v-model="birthday"
                      format="YYYY-MM-DD"
                      type="date"
                      placeholder="Select date"
                    ></date-picker>
                  </CCol>
                </CRow>
              </CCol>
              <CCol sm="12">
                <div class="d-flex justify-content-center">
                  <CButton
                    v-b-modal.modal-confirmF
                    :color="'info'"
                    :size="'lg'"
                    class="my-2 mx-4 buttons"
                    @click="createNewUser()"
                  >
                    Lưu
                  </CButton>
                  <CButton
                    v-b-modal.modal-confirm
                    :color="'danger'"
                    :size="'lg'"
                    class="my-2 mx-4 buttons"
                    v-on:click.prevent="cancelCreate()"
                  >
                    Hủy
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </div>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "NewCreateUser",
  data() {
    return {
      image: [],
      id: "",
      address: "",
      sex: ["Nam", "Nữ"],
      birthday: "",
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      phone_number: "",
      password: "",
      dataModal: "",
    };
  },
  components: { DatePicker },
  computed: {
    ...mapGetters(["message", "success", "error"]),
  },
  watch: {
    success() {
      if (this.success) {
        this.$toaster.success(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
        this.$router.push({ name: "List User" });
      }
    },
    error() {
      if (this.error) {
        this.$toaster.error(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["error", false]);
      }
    },
  },
  methods: {
    ...mapActions({ createUser: "createUser" }),
    createNewUser() {
      if (this.username == "") {
        this.$toaster.error("Vui lòng nhập username");
      } else if (this.email == "") {
        this.$toaster.error("Vui lòng nhập email");
      } else if (this.phone_number == "") {
        this.$toaster.error("Vui lòng nhập số điện thoại");
      } else if (this.password == "") {
        this.$toaster.error("Vui lòng nhập mật khẩu");
      } else {
        const formData = {
          username: this.username,
          email: this.email,
          phone_number: this.phone_number,
          password: this.password,
        };
        this.createUser(formData);
      }
    },
    cancelCreate() {
      this.$router.push({ name: "List User" });
    },
  },
};
</script>
<style>
.avatar-create {
  margin-left: 110px;
  margin-top: 100px;
}
.mx-datepicker {
  width: 100% !important;
}
.buttons {
  width: 110px;
  height: 50px;
}
</style>
