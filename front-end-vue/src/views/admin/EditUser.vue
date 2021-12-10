<template>
  <div>
    <CCard>
      <CCardBody>
        <div class="create-user">
          <div class="box-title d-flex justify-content-between">
            <h1 class="title">Chỉnh sửa thông tin người dùng</h1>
          </div>
          <div class="px-3 py-2">
            <CRow>
              <CCol sm="4">
                <div class="avatar-creat">
                  <img
                    style="width: 200px; height: 200px"
                    v-if="this.avatar == null"
                    :src="`${imgNull}`"
                  />
                  <img
                    style="width: 200px; height: 200px"
                    v-else
                    :src="`${this.avatar}`"
                  />
                  <CRow
                    ><b-form-group
                      id="input-group-8"
                      label="Chọn ảnh đại diện:"
                      label-for="input-8"
                      class="d-flex flex-column mx-3 my-2"
                    >
                      <b-form-file
                        @change="uploadImage"
                        id="picture"
                        name="picture"
                        v-model="picture"
                      ></b-form-file>
                    </b-form-group>
                  </CRow>
                </div>
              </CCol>
              <CCol sm="8">
                <CRow>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">ID</label>
                    <CInput type="text" v-model="id" disabled />
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
                      v-model="user_sex"
                      :options="sex"
                      placeholder="Chọn giới tính"
                      style="width: 487px"
                      type="text"
                    />
                  </CCol>
                  <CCol sm="6" class="mb-3">
                    <label class="w-100 mb-1">Ngày sinh</label>
                    <CInput type="date" v-model="birthday" />
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
                    @click="updateUser()"
                  >
                    Lưu
                  </CButton>
                  <CButton
                    v-b-modal.modal-confirm
                    :color="'danger'"
                    :size="'lg'"
                    class="my-2 mx-4 buttons"
                    v-on:click.prevent="cancelUpdate()"
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
import { Urls } from "../../utils/urls";
import "vue2-datepicker/index.css";

export default {
  name: "EditUser",
  data() {
    return {
      isLoading: false,
      image: null,
      birthday: "",
      id: "",
      password: "",
      user_sex: "",
      first_name: "",
      last_name: "",
      address: "",
      username: "",
      email: "",
      phone_number: "",
      sex: ["Nam", "Nữ"],
      avatar: "",
      imgNull: Urls.IMG_NULL,
      picture: null,
    };
  },
  created() {
    const { params } = this.$route;
    this.getDetailUserByID(params.id);
  },
  computed: {
    ...mapGetters(["detailUser", "message", "success", "error"]),
  },
  watch: {
    detailUser() {
      this.id = this.detailUser.id;
      this.username = this.detailUser.username;
      this.first_name = this.detailUser.fistname;
      this.last_name = this.detailUser.lastname;
      this.email = this.detailUser.email;
      this.phone_number = this.detailUser.phone_number;
      this.address = this.detailUser.address;
      if (this.detailUser.birthday != null) {
        this.birthday = this.detailUser.birthday.split(" ")[0];
      }
      this.user_sex = this.detailUser.sex;
      this.avatar = this.detailUser.avatar;
    },
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
    ...mapActions({ getDetailUserByID: "getDetailUserByID" }),
    ...mapActions({ updateUserByID: "updateUserByID" }),
    uploadImage: function () {
      var file = document.querySelector("input[type=file]").files[0];
      var reader = new FileReader();
      const _this = this;
      reader.onload = function (e) {
        _this.image_temp = e.target.result;
      };
      reader.onerror = function (error) {
        alert(error);
      };
      reader.readAsDataURL(file);
    },

    updateUser() {
      const { params } = this.$route;
      let formData = new FormData();
      formData.append("avatar", this.picture);
      formData.append("birthday", this.birthday);
      formData.append("address", this.address);
      formData.append("id", params.id);
      formData.append("fistname", this.first_name);
      formData.append("lastname", this.last_name);
      formData.append("sex", this.user_sex);
      formData.append("username", this.username);
      formData.append("email", this.email);
      formData.append("phone_number", this.phone_number);
      formData.append("password", this.password);
      formData.append("role", 1);
      this.updateUserByID(formData);
    },
    cancelUpdate() {
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
