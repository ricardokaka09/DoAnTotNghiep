<template>
  <div class="list-notification">
    <CCard>
      <CCardBody>
        <div class="box-title d-flex justify-content-between">
          <h1 class="title">Quản lý Thông báo</h1>
          <div class="d-flex">
            <CButton color="dark" variant="outline" v-b-modal.modal-filter
              ><b-icon icon="funnel"></b-icon
            ></CButton>
            <download-csv :data="fillterItem" name="listNoticate.csv">
              <CButton color="dark" variant="outline" class="mx-3"
                ><b-icon icon="download"></b-icon
              ></CButton>
            </download-csv>

            <CButton
              class="mx-1 btn btn-success"
              square
              variant="outline"
              size="sm"
              v-b-modal.modal-create-noti
            >
              Thêm mới
            </CButton>
          </div>
        </div>
        <Tables
          :items="fillterAll ? listNotification : fillterItem"
          :fields="fields"
          :itemsPerPage="10"
        >
          <template v-slot:created_at="{ item }">
            <td style="text-align: right">
              {{
                moment(new Date(item.created_at).toLocaleDateString()).format(
                  "MM-DD-YYYY"
                )
              }}
            </td>
          </template>
          <template v-slot:avatar="{ item }">
            <td>
              <img :src="`${item.image}`" style="width: 40px; height: 40px" />
            </td>
          </template>
          <template v-slot:action="{ item }">
            <td class="py-2 pl-2 pr-1 d-flex justify-content-center">
              <CButton
                class="mx-1"
                v-b-popover.hover.top="'Chỉnh sửa'"
                color="primary"
                square
                v-on:click="detailNotiByIdToChange(item.id)"
                variant="outline"
                size="sm"
                v-b-modal.modal-update-noti
              >
                <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
              </CButton>
              <CButton
                class="mx-1"
                v-b-popover.hover.top="'Xóa'"
                color="danger"
                square
                v-on:click="showConfirm(item.id)"
                variant="outline"
                size="sm"
                v-b-modal.modal-delete-noti
              >
                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
              </CButton>
              <CButton
                class="mx-1"
                v-b-popover.hover.top="'Xem thông tin chi tiết'"
                color="info"
                square
                v-on:click="detailNotiById(item.id)"
                variant="outline"
                size="sm"
                v-b-modal.modal-detail-notis
              >
                <b-icon icon="eye" aria-hidden="true"></b-icon>
              </CButton>
            </td>
          </template>
        </Tables>
      </CCardBody>
    </CCard>
    <b-modal id="modal-filter" hide-header hide-footer>
      <div class="d-block text-center">
        <h5>Tìm kiếm nâng cao</h5>
      </div>
      <div>
        <CContainer>
          <CRow>
            <CCol lg="6" class="py-3"
              ><div>
                <h5>Ngày bắt đầu</h5>
                <date-picker
                  id="StartDate"
                  name="StartDate"
                  v-model="startDate"
                  type="date"
                  :disabled-date="disabledEndDates"
                  :key="reset"
                ></date-picker>
                <div style="color: red; margin-top: 1px" v-if="startDateErr">
                  {{ startDateErr }}
                </div>
              </div></CCol
            >
            <CCol lg="6" class="py-3"
              ><h5>Ngày kết thúc</h5>
              <date-picker
                id="EndDate"
                name="EndDate"
                v-model="endDate"
                type="date"
                :disabled-date="disabledEndDates"
                @change="handleEndDate"
                :key="reset"
              ></date-picker>
              <div style="color: red; margin-top: 1px" v-if="endDateErr">
                {{ endDateErr }}
              </div></CCol
            >
            <CCol lg="12"
              ><div class="d-flex justify-content-center">
                <b-button
                  variant="success"
                  class="mx-1"
                  color="info"
                  square
                  v-on:click="filterDate()"
                  size="sm"
                  :disabled="startDate === null && endDate === null"
                  >Tìm kiếm</b-button
                >
                <b-button
                  variant="secondary"
                  class="mx-1"
                  color="info"
                  square
                  v-on:click="resetFilter()"
                  size="sm"
                  :disabled="startDate === null && endDate === null"
                  >Reset</b-button
                >
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </b-modal>

    <!-- Modal create notification -->
    <b-modal size="lg" id="modal-create-noti" hide-header hide-footer>
      <div class="header-modal-detail text-center py-3">
        <h5 style="color: white !important">Thêm thông báo</h5>
      </div>
      <div>
        <CContainer>
          <div class="detail-main-content pt-4 pb-3">
            <div class="py-3 mx-3 position-relative">
              <CRow class="bg-news justify-content-center">
                <CCol
                  lg="2"
                  class="py-1 text-left"
                  style="font-size: 16px; font-weight: 600"
                  >TIÊU ĐỀ</CCol
                >
                <CCol lg="10" class="text-left">
                  <CInput
                    class="input-title"
                    placeholder="Nhập tiêu đề..."
                    v-model="create_title"
                  />
                </CCol>
              </CRow>
            </div>
            <div class="py-1 pr-3 mx-3 my-3 position-relative">
              <CRow class="justify-content-between">
                <CCol lg="4" class="text-left">
                  <div class="bg-news">
                    <div class="py-1 text-center" style="color: #333">
                      <b-form-group
                        id="input-group-8"
                        label="Chọn hình ảnh"
                        label-for="input-8"
                        class="d-flex flex-column mx-3 my-2"
                      >
                        <b-form-file
                          @change="uploadImage"
                          v-model="create_image"
                          plain
                        ></b-form-file>
                      </b-form-group>
                    </div>
                    <div class="py-1 text-center">
                      <img
                        v-if="this.image_temp === null"
                        src="@/assets/img/no-image.jpg"
                        style="width: 100%; height: 100%"
                      />
                      <img
                        v-else
                        :src="`${this.image_temp}`"
                        style="width: 100%; height: 100%"
                      />
                    </div>
                  </div>
                  <div class="p-3 text-center">
                    <CButton
                      class="mx-1 btn btn-success create-button"
                      v-on:click="createNoti()"
                      square
                      variant="outline"
                      size="sm"
                    >
                      Thêm mới
                    </CButton>
                  </div>
                </CCol>
                <CCol lg="7" class="bg-news py-1 text-left">
                  <div class="justify-content-center h-100" style="color: #333">
                    <div
                      class="py-1 text left"
                      style="font-size: 16px; font-weight: 600"
                    >
                      NỘI DUNG
                    </div>
                    <div class="py-1 text left h-75">
                      <CTextarea
                        class="input-content h-100"
                        placeholder="Nhập nội dung..."
                        v-model="create_content"
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>
            </div>
          </div>
        </CContainer>
      </div>
    </b-modal>

    <!-- Modal update notification -->
    <b-modal size="lg" id="modal-update-noti" hide-header hide-footer>
      <div class="header-modal-detail text-center py-3">
        <h5 style="color: white !important">Chỉnh sửa thông báo</h5>
      </div>
      <div>
        <CContainer>
          <div class="detail-main-content pt-4 pb-3">
            <div class="py-3 mx-3 position-relative">
              <CRow class="bg-news justify-content-center">
                <CCol
                  lg="2"
                  class="py-1 text-left"
                  style="font-size: 16px; font-weight: 600"
                  >TIÊU ĐỀ</CCol
                >
                <CCol lg="10" class="text-left">
                  <CInput
                    class="input-title"
                    placeholder="Nhập tiêu đề..."
                    v-model="update_title"
                  />
                </CCol>
              </CRow>
            </div>
            <div class="py-1 pr-3 mx-3 my-3 position-relative">
              <CRow class="justify-content-between">
                <CCol lg="4" class="text-left">
                  <div class="bg-news">
                    <div class="py-1 text-center" style="color: #333">
                      <b-form-group
                        id="input-group-8"
                        label="Chọn hình ảnh"
                        label-for="input-8"
                        class="d-flex flex-column mx-3 my-2"
                      >
                        <b-form-file
                          @change="uploadImage"
                          v-model="edit_image"
                          plain
                        ></b-form-file>
                      </b-form-group>
                    </div>
                    <div class="py-1 text-center">
                      <img
                        v-if="this.image_temp === null"
                        src="@/assets/img/no-image.jpg"
                        style="width: 100%; height: 100%"
                      />
                      <img
                        v-else
                        :src="`${this.image_temp}`"
                        style="width: 100%; height: 100%"
                      />
                    </div>
                  </div>
                  <div class="p-3 text-center">
                    <CButton
                      class="mx-1 btn btn-success create-button"
                      v-on:click="updateNoti()"
                      square
                      variant="outline"
                      size="sm"
                    >
                      Lưu thay đổi
                    </CButton>
                  </div>
                </CCol>
                <CCol lg="7" class="bg-news py-1 text-left">
                  <div class="justify-content-center h-100" style="color: #333">
                    <div
                      class="py-1 text left"
                      style="font-size: 16px; font-weight: 600"
                    >
                      NỘI DUNG
                    </div>
                    <div class="py-1 text left h-75">
                      <CTextarea
                        class="input-content h-100"
                        placeholder="Nhập nội dung..."
                        v-model="update_content"
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>
            </div>
          </div>
        </CContainer>
      </div>
    </b-modal>

    <!-- modal-detail-notification -->
    <b-modal size="lg" id="modal-detail-notis" hide-header hide-footer>
      <div class="header-modal-detail text-center py-3">
        <h5 style="color: white !important">Thông tin chi tiết</h5>
      </div>
      <div>
        <CContainer>
          <div class="detail-main-content pt-4 pb-3">
            <div class="py-3 mx-3 position-relative">
              <CRow class="bg-news justify-content-center">
                <CCol
                  lg="2"
                  class="py-1 text-left"
                  style="font-size: 16px; font-weight: 600"
                  >TIÊU ĐỀ</CCol
                >
                <CCol
                  lg="10"
                  class="py-1 text-left"
                  style="font-size: 16px; text-transform: uppercase"
                  >{{ this.title }}</CCol
                >
              </CRow>
            </div>
            <div class="py-1 pr-3 mx-3 my-3 position-relative">
              <CRow class="justify-content-between">
                <CCol lg="4" class="text-left">
                  <div class="bg-news" style="color: #333">
                    <div
                      class="py-1 text-center"
                      style="font-size: 16px; font-weight: 600"
                    >
                      HÌNH ẢNH
                    </div>
                    <div class="py-1 text-center">
                      <img
                        v-if="this.image != null"
                        :src="`${this.image}`"
                        style="width: 100%; height: 100%"
                      />
                      <img
                        v-if="this.image == null"
                        src="@/assets/img/no-image.jpg"
                        style="width: 100%; height: 100%"
                      />
                    </div>
                  </div>
                  <div class="p-3">
                    <span
                      class="py-1 text-center"
                      style="font-size: 16px; font-weight: 600"
                      >Thời gian:
                      {{ moment(this.created_at).format("DD-MM-YYYY") }}</span
                    >
                  </div>
                </CCol>
                <CCol lg="7" class="bg-news py-1 text-left">
                  <div class="justify-content-center h-100" style="color: #333">
                    <div
                      class="py-1 text left"
                      style="font-size: 16px; font-weight: 600"
                    >
                      NỘI DUNG
                    </div>
                    <div
                      class="py-1 text left h-75"
                      style="
                        font-size: 16px;
                        border-radius: 10px;
                        padding: 10px;
                      "
                    >
                      <span>{{ this.content }}</span>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </div>
          </div>
        </CContainer>
      </div>
    </b-modal>

    <!-- model-delete-notification -->
    <b-modal id="modal-delete-noti" hide-header hide-footer>
      <div class="header-modal-detail text-center py-3">
        <h5 style="color: white !important">Xoá thông báo</h5>
      </div>
      <div>
        <CContainer>
          <div class="detail-main-content pt-4 pb-3">
            <div
              class="py-3 mx-3 position-relative justify-content-center text-center"
            >
              <h4>Bạn chắc chắn muốn xoá thông báo này?</h4>
            </div>
            <div class="py-1 pr-3 mx-3 my-3 position-relative">
              <CRow class="justify-content-between">
                <CCol lg="6" class="py-1 text-center">
                  <CButton
                    class="mx-1 btn btn-danger"
                    square
                    variant="outline"
                    size="lg"
                    @click="$bvModal.hide('modal-delete-noti')"
                  >
                    Huỷ
                  </CButton>
                </CCol>
                <CCol lg="6" class="py-1 text-center">
                  <CButton
                    class="mx-1 btn btn-success"
                    v-on:click="deleteNoti(dataModal)"
                    square
                    variant="outline"
                    size="lg"
                  >
                    Xoá
                  </CButton>
                </CCol>
              </CRow>
            </div>
          </div>
        </CContainer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Tables from "../../components/common/Tables";
import { tableFields } from "../../utils/table-field";
import { mapActions, mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";

export default {
  name: "ListNotification",
  data() {
    return {
      fields: tableFields.NOTIFICATION,
      dataModal: "",
      create_title: "",
      create_content: "",
      create_image: [],
      dataDetail: {},
      startDate: null,
      endDate: null,
      startDateErr: "",
      endDateErr: "",
      fillterItem: [],
      reset: false,
      optionNotification: [],
      amount: null,
      transaction_id: null,
      username: "",
      fullName: "",
      point_before: null,
      point_after: null,
      messageTopup: null,
      date: null,
      title: "",
      created_at: "",
      content: "",
      moment: false,
      detail: {
        title: "",
        image: null,
        content: "",
      },
      image_temp: null,
      image: null,
      fillterAll: true,
      update_title: "",
      update_content: "",
      update_image: [],
      edit_image: [],
      id: "",
    };
  },
  created() {
    this.moment = moment;
    this.getListNotification();
    this.fillterItem = this.listNotification;
  },
  computed: {
    ...mapGetters(["listNotification", "message", "error", "success"]),
  },
  watch: {
    success() {
      if (this.success) {
        if (this.message === "Notification successfully create") {
          this.message_success = "Tạo thông báo mới thành công";
        } else if (this.message === "Delete notification complete") {
          this.message_success = "Xoá thông báo thành công";
        } else if (this.message === "Successful update notification") {
          this.message_success = "Cập nhật thông báo thành công";
        }
        this.$toaster.success(this.message_success);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
        this.getListNotification();
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
  components: {
    Tables,
    DatePicker,
  },
  methods: {
    ...mapActions({ getListNotification: "getListNotification" }),
    ...mapActions({ createNotification: "createNotification" }),
    ...mapActions({ updateNotification: "updateNotification" }),
    ...mapActions({ deleteNotis: "deleteNotis" }),
    detailNotiById(id) {
      this.dataModal = id;
      this.optionNotification = this.listNotification.filter(
        (item) => item.id == id
      );
      this.title = this.optionNotification[0].title;
      this.content = this.optionNotification[0].content;
      this.created_at = this.optionNotification[0].created_at;
      this.image = this.optionNotification[0].image;
    },
    detailNotiByIdToChange(id) {
      this.dataModal = id;
      this.optionNotification = this.listNotification.filter(
        (item) => item.id == id
      );
      this.id = this.optionNotification[0].id;
      this.title = this.optionNotification[0].title;
      this.update_title = this.optionNotification[0].title;
      this.content = this.optionNotification[0].content;
      this.update_content = this.optionNotification[0].content;
      this.created_at = this.optionNotification[0].created_at;
      this.image = this.optionNotification[0].image;
      this.image_temp = this.optionNotification[0].image;
    },
    showConfirm(id) {
      this.dataModal = id;
    },
    deleteNoti(id) {
      this.deleteNotis(id);
      this.getListNotification();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-delete-noti");
      });
    },
    createNoti() {
      if (this.create_title == "") {
        this.$toaster.error("Vui lòng nhập tiêu đề");
      } else if (this.create_content == "") {
        this.$toaster.error("Vui lòng nhập nội dung");
      } else {
        var formData = new FormData();
        formData.append("title", this.create_title);
        if (this.create_image !== null) {
          formData.append("image", this.create_image);
        }
        formData.append("content", this.create_content);
        this.createNotification(formData);
        this.create_title = "";
        this.create_content = "";
        this.create_image = null;
        this.$nextTick(() => {
          this.$bvModal.hide("modal-create-noti");
        });
      }
    },
    updateNoti() {
      var formData = new FormData();
      formData.append("id", this.id);
      formData.append("title", this.update_title);
      if (this.update_image !== null) {
        formData.append("image", this.edit_image);
      }
      formData.append("content", this.update_content);
      this.updateNotification(formData);
      this.image_temp = null;
      this.$nextTick(() => {
        this.$bvModal.hide("modal-update-noti");
      });
    },
    filterDate() {
      this.fillterAll = !this.fillterAll;
      this.fillterItem = this.listTopUp.filter((dt) => {
        const min = this.endDate.getTime();
        const max = this.startDate.getTime();
        const localDate = new Date(dt.created_at);
        const localTime = Date.parse(localDate);
        if (min === null && max === null) {
          return dt;
        } else {
          return (
            (localTime > min && localTime < max) ||
            (localTime < min && localTime > max)
          );
        }
      });
    },
    resetFilter() {
      this.fillterAll = !this.fillterAll;
      this.fillterItem = this.listNotification;
      this.startDate = null;
      this.endDate = null;
      this.reset = !this.reset;
    },
    handleEndDate() {
      this.endDateErr = "";
      var startDate = new Date(this.startDate).getTime();
      var endDate = new Date(this.endDate).getTime();
      if (startDate > endDate) {
        this.endDateErr = "Ngày kết thúc phải lớn hơn ngày bắt đầu";
      }
    },
    disabledEndDates(date) {
      return date > new Date();
    },
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
  },
};
</script>
<style lang="scss">
.modal-backdrop {
  opacity: 0.5 !important;
}
.pagination {
  margin-top: 30px;
  justify-content: center !important;
}
.list-topup {
  td {
    text-align: left;
  }
  td {
    &:last-child {
      text-align: right;
    }
    &:nth-child(6) {
      text-align: right;
    }
    &:nth-child(7) {
      text-align: right;
    }
    &:nth-child(8) {
      text-align: right;
    }
  }
}
#modal-detail___BV_modal_body_ {
  padding: unset !important;
  .container {
    background: #f5f5f5 !important;
    border-radius: 0 0 10px 10px;
    .detail-main-content {
      .point-amount {
        background: white;
        border-radius: 10px;
      }
    }
  }
  .coin-img {
    top: -30%;
    right: calc(50% - 25px);
    img {
      width: 40px;
      height: 40px;
    }
  }
  .modal-content {
    border-radius: 10px;
  }
  .header-modal-detail {
    background: #303c54;
    border-radius: 10px 10px 0 0;
    .h5 {
      color: white !important;
    }
  }
}
#modal-detail-notis___BV_modal_content_ {
  border-radius: 15px !important;
  #modal-detail-notis___BV_modal_body_ {
    padding: unset !important;
    .container {
      background: #f5f5f5 !important;
      border-radius: 0 0 10px 10px;
      .detail-main-content {
        .bg-news {
          background: white;
          border-radius: 10px;
          padding: 20px;
          margin: 0;
        }
      }
    }
    .modal-content {
      border-radius: 10px;
    }
    .header-modal-detail {
      background: #303c54;
      border-radius: 10px 10px 0 0;
      .h5 {
        color: white !important;
      }
    }
  }
}
#modal-create-noti___BV_modal_content_ {
  border-radius: 15px !important;
  #modal-create-noti___BV_modal_body_ {
    padding: unset !important;
    .container {
      background: #f5f5f5 !important;
      border-radius: 0 0 10px 10px;
      .detail-main-content {
        .bg-news {
          background: white;
          border-radius: 10px;
          padding: 25px 20px 10px 20px;
          margin: 0;
          div {
            .input-title {
              input {
                font-size: 16px;
                border-radius: 5px;
                box-shadow: none;
              }
            }
            div {
              .input-content {
                textarea {
                  font-size: 16px;
                  border-radius: 5px;
                  padding: 10px;
                  height: 100%;
                  box-shadow: none;
                }
              }
            }
          }
        }
      }
    }
    .modal-content {
      border-radius: 10px;
    }
    .header-modal-detail {
      background: #303c54;
      border-radius: 10px 10px 0 0;
      .h5 {
        color: white !important;
      }
    }
    .create-button {
      width: 130px;
      height: 50px;
      font-size: 16px;
    }
  }
}
#modal-update-noti___BV_modal_content_ {
  border-radius: 15px !important;
  #modal-update-noti___BV_modal_body_ {
    padding: unset !important;
    .container {
      background: #f5f5f5 !important;
      border-radius: 0 0 10px 10px;
      .detail-main-content {
        .bg-news {
          background: white;
          border-radius: 10px;
          padding: 25px 20px 10px 20px;
          margin: 0;
          div {
            .input-title {
              input {
                font-size: 16px;
                border-radius: 5px;
                box-shadow: none;
              }
            }
            div {
              .input-content {
                textarea {
                  font-size: 16px;
                  border-radius: 5px;
                  padding: 10px;
                  height: 100%;
                  box-shadow: none;
                }
              }
            }
          }
        }
      }
    }
    .modal-content {
      border-radius: 10px;
    }
    .header-modal-detail {
      background: #303c54;
      border-radius: 10px 10px 0 0;
      .h5 {
        color: white !important;
      }
    }
    .create-button {
      width: 130px;
      height: 50px;
      font-size: 16px;
    }
  }
}
#modal-delete-noti___BV_modal_content_ {
  border-radius: 15px !important;
  #modal-delete-noti___BV_modal_body_ {
    padding: unset !important;
    .container {
      background: #f5f5f5 !important;
      border-radius: 0 0 10px 10px;
    }
    .modal-content {
      border-radius: 10px;
    }
    .header-modal-detail {
      background: #303c54;
      border-radius: 10px 10px 0 0;
      .h5 {
        color: white !important;
      }
    }
  }
}
</style>
