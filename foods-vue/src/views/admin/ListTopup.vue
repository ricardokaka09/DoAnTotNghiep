<template>
  <div class="list-topup">
    <CCard>
      <CCardBody>
        <div class="box-title d-flex justify-content-between">
          <h1 class="title">
            Quản lý Topup ({{
              fillterAll ? listTopUp.length : fillterItem.length
            }}
            Giao dịch)
          </h1>
          <div class="d-flex">
            <CButton color="dark" variant="outline" v-b-modal.modal-filter
              ><b-icon icon="funnel"></b-icon
            ></CButton>
            <download-csv :data="fillterItem" name="listtopup.csv">
              <CButton color="dark" variant="outline" class="mx-3"
                ><b-icon icon="download"></b-icon
              ></CButton>
            </download-csv>

            <router-link :to="{ name: 'create topup' }" class="btn btn-success"
              ><b-icon icon="plus"></b-icon>Thêm mới</router-link
            >
          </div>
        </div>
        <Tables
          :items="fillterAll ? listTopUp : fillterItem"
          :fields="fields"
          :itemsPerPage="10"
        >
          <template v-slot:id="{ item }">
            <td>#{{ item.id }}</td>
          </template>
          <template v-slot:created_at="{ item }">
            <td>
              {{ moment(item.created_at).format("YYYY-MM-DD") }}
            </td>
          </template>
          <template v-slot:action="{ item }">
            <td class="py-2 pl-2 pr-1 d-flex justify-content-center">
              <CButton
                class="mx-1"
                color="info"
                square
                v-on:click="detailTopUpById(item.id)"
                variant="outline"
                size="sm"
                v-b-modal.modal-detail
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
                ></date-picker></div
            ></CCol>
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
    <!-- Modal Detail TopUp -->
    <b-modal id="modal-detail" hide-header hide-footer>
      <div class="header-modal-detail text-center py-3">
        <h5 style="color: white !important">Chi tiết giao dịch</h5>
      </div>
      <div>
        <CContainer>
          <div class="detail-main-content pt-4 pb-3">
            <div class="point-amount py-3 mx-3 position-relative">
              <CRow>
                <div class="coin-img position-absolute">
                  <img src="@/assets/img/coin.png" alt="" />
                </div>
                <CCol lg="12" class="py-1 text-center" style="font-size: 20px"
                  >{{ this.amount }} Point</CCol
                >
              </CRow>
            </div>
            <div class="point-amount py-1 px-3 mx-3 my-3 position-relative">
              <CRow>
                <CCol lg="6" class="py-1 text-left">Trạng thái</CCol>
                <CCol
                  lg="6"
                  class="py-1 text-right"
                  style="color: #41b746; font-weight: 600"
                  >Thành công</CCol
                >
              </CRow>
            </div>
            <div class="point-amount py-1 px-3 mx-3 my-3 position-relative">
              <CRow>
                <CCol lg="6" class="py-1 text-left">ID giao dịch</CCol>
                <CCol lg="6" class="py-1 text-right">{{
                  this.transaction_id
                }}</CCol>
              </CRow>
            </div>
            <div class="point-amount py-1 px-3 mx-3 my-3 position-relative">
              <div class="mx-2">
                <CRow>
                  <CCol lg="6" class="py-2 text-left">Tên tài khoản</CCol>
                  <CCol lg="6" class="py-2 text-right">{{
                    this.username
                  }}</CCol>
                </CRow>
              </div>
              <div class="mx-2">
                <CRow>
                  <CCol lg="6" class="py-2 text-left">Tên đầy đủ</CCol>
                  <CCol lg="6" class="py-2 text-right">{{
                    this.fullName
                  }}</CCol>
                </CRow>
              </div>
              <div class="mx-2">
                <CRow>
                  <CCol lg="6" class="py-2 text-left"
                    >Số Point trước khi nạp</CCol
                  >
                  <CCol lg="6" class="py-2 text-right">{{
                    this.point_before
                  }}</CCol>
                </CRow>
              </div>
              <div class="mx-2">
                <CRow>
                  <CCol lg="6" class="py-2 text-left"
                    >Số Point sau khi nạp</CCol
                  >
                  <CCol lg="6" class="py-2 text-right">{{
                    this.point_after
                  }}</CCol>
                </CRow>
              </div>
              <div class="mx-2">
                <CRow>
                  <CCol lg="6" class="py-2 text-left">Thời gian</CCol>
                  <CCol lg="6" class="py-2 text-right">{{ this.date }}</CCol>
                </CRow>
              </div>
              <div class="mx-2">
                <CRow>
                  <CCol lg="6" class="py-2 text-left">Tin nhắn</CCol>
                  <CCol lg="6" class="py-2 text-right">{{
                    this.messageTopup
                  }}</CCol>
                </CRow>
              </div>
            </div>
          </div>
        </CContainer>
      </div>
    </b-modal>
    <!-- Modal Detail TopUp -->
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
  name: "ListTopup",
  data() {
    return {
      fields: tableFields.TOPUP,
      dataModal: "",
      dataDetail: {},
      startDate: null,
      endDate: null,
      startDateErr: "",
      endDateErr: "",
      fillterItem: [],
      reset: false,
      optionTopup: [],
      amount: null,
      transaction_id: null,
      username: "",
      fullName: "",
      point_before: null,
      point_after: null,
      messageTopup: null,
      date: null,
      moment: false,
      fillterAll: true,
    };
  },
  components: {
    Tables,
    DatePicker,
  },
  created() {
    this.moment = moment;
    this.getListTopUp();
  },
  computed: {
    ...mapGetters(["listTopUp", "message", "error", "detailTopUp"]),
  },
  watch: {
    success() {
      if (this.success) {
        this.$toaster.success(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
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
    ...mapActions({ getListTopUp: "getListTopUp" }),
    detailTopUpById(id) {
      this.dataModal = id;
      this.optionTopup = this.listTopUp.filter((item) => item.id == id);
      this.amount = this.optionTopup[0].amount;
      this.transaction_id = this.optionTopup[0].transaction_id;
      this.username = this.optionTopup[0].username;
      this.point_before = this.optionTopup[0].point_before;
      this.point_after = this.optionTopup[0].point_after;
      this.messageTopup = this.optionTopup[0].message;
      this.fullName = this.optionTopup[0].fullname;
      this.date = this.optionTopup[0].created_at;
      this.date = new Date(this.date).toLocaleDateString();
    },
    createTopUp() {
      this.$router.push({ name: "create topup" });
    },
    filterDate() {
      this.fillterAll = !this.fillterAll;
      this.fillterItem = this.listTopUp.filter((dt) => {
        const min = new Date(this.startDate).toLocaleDateString();
        const max = new Date(this.endDate).toLocaleDateString();
        const localDate = new Date(dt.created_at).toLocaleDateString();
        if (min === null && max === null) {
          return dt;
        } else {
          return localDate >= min && localDate <= max;
        }
      });
    },
    resetFilter() {
      this.fillterAll = !this.fillterAll;
      this.fillterItem = this.listTopUp;
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
</style>
