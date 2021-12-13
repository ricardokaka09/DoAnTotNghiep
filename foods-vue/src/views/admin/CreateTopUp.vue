<template>
  <div class="card-content">
    <CCard class="my-2">
      <CCardBody style="min-height: calc(100vh - 250px)">
        <div
          class="d-flex flex-column justify-content-between"
          style="min-height: calc(100vh - 290px)"
        >
          <CRow>
            <CCol sm="4">
              <div class="d-flex flex-column">
                <label>Tên Người dùng</label>
                <div class="d-flex">
                  <multiselect
                    v-model="user_id"
                    tag-placeholder="Add this as new tag"
                    placeholder="Search or add a tag"
                    label="email"
                    track-by="email"
                    :options="listUserOptions"
                    :multiple="true"
                  ></multiselect>
                </div>
              </div>
            </CCol>
            <CCol sm="4">
              <CInput
                label="Số lượng"
                placeholder="Số lượng"
                v-model="amount"
              />
            </CCol>
            <CCol sm="4">
              <CTextarea
                label="Message"
                placeholder="Message"
                v-model="messageTopUp"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <div class="d-flex justify-content-center">
                <CButton
                  v-b-modal.modal-confirm
                  :color="'info'"
                  :size="'lg'"
                  class="mt-3 mx-2"
                  :disabled="isLoading"
                >
                  Nạp tiền
                </CButton>
                <CButton
                  v-b-modal.modal-confirm
                  :color="'secondary'"
                  :size="'lg'"
                  class="mt-3 mx-2"
                >
                  Trở về
                </CButton>
              </div>
            </CCol>
          </CRow>
        </div>
      </CCardBody>
    </CCard>
    <div>
      <b-modal id="modal-confirm" hide-header hide-footer>
        <div class="d-block text-center mb-3">
          <h5>
            Bạn có chắc chắn muốn nạp tiền.<br />
            Vui lòng nhập lại số lượng Point
          </h5>
        </div>
        <div class="content-modal-confirm">
          <CInput placeholder="Số lượng" v-model="amount_check" />
          <div style="color: red" class="text-center" v-if="errorAmountCheck">
            Số lượng point không chính xác
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <b-button
            class="mx-2 mt-3 btn btn-success"
            block
            @click="createNewTopUp()"
            >Xác nhận</b-button
          >
          <b-button
            class="mx-2 mt-3 btn btn-danger"
            block
            @click="$bvModal.hide('modal-confirm')"
          >
            Trở về
          </b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateTopUp",
  data() {
    return {
      email: "",
      amount: "",
      messageTopUp: "",
      listUserOptions: [],
      user_id: [],
      listAll: [],
      isLoading: false,
      listUserId: [],
      amount_check: null,
      errorAmountCheck: false,
    };
  },
  created() {
    this.$store.commit("set", ["success", false]);
    this.$store.commit("set", ["message", ""]);
    this.$store.commit("set", ["error", false]);
    this.getListUser();
  },
  computed: {
    ...mapGetters(["listUser", "message", "success", "error"]),
  },
  watch: {
    listUser() {
      this.listUserOptions = this.listUser.map((item) => ({
        id: item.id.toString(),
        email: item.email,
      }));
      this.listUser.map((item) => {
        this.listAll.push(item.id);
      });
      this.listUserOptions.splice(0, 0, {
        email: "Select All",
        id: this.listAll,
      });
    },
    success() {
      if (this.success) {
        this.$toaster.success(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
        this.$router.push({ name: "Top Up" });
      }
    },
    error() {
      if (this.error) {
        this.$toaster.error(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["error", false]);
        setTimeout(() => {
          this.$router.go();
        }, 2000);
      }
    },
  },
  methods: {
    ...mapActions({ createTopUp: "createTopUp" }),
    ...mapActions({ getListUser: "getListUser" }),
    setAlert() {
      this.errorAmountCheck = true;
    },
    createNewTopUp() {
      this.isLoading = true;
      if (this.user_id.length == 0) {
        this.$toaster.error("Vui lòng chọn người nhận");
      } else if (this.amount == "") {
        this.$toaster.error("Vui lòng nhập số lương point");
      } else if (this.amount !== this.amount_check) {
        this.setAlert();
        setTimeout(() => (this.errorAmountCheck = false), 5000);
      } else if (this.user_id[0].id.length == this.listAll.length) {
        this.isLoading = true;
        const formData = {
          receiver_id: this.listAll,
          amount: this.amount,
          message: this.messageTopUp,
        };
        this.createTopUp(formData);
      } else {
        this.user_id.map((item) => {
          this.listUserId.push(item.id);
        });
        this.isLoading = true;
        const formData = {
          receiver_id: this.listUserId,
          amount: this.amount,
          message: this.messageTopUp,
        };
        this.createTopUp(formData);
      }
    },
  },
};
</script>
<style lang="scss">
.modal-backdrop {
  opacity: 0.5;
}
</style>
