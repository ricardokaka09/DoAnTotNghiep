<template>
  <div class="list-reward">
    <CCard>
      <CCardBody>
        <div class="box-title d-flex justify-content-between">
          <h1 class="title">
            Quản lý Thưởng({{
              filterAll ? listReward.length : fillterItem.length
            }}
            Giao dịch)
          </h1>
          <div class="d-flex">
            <CButton color="dark" variant="outline" v-b-modal.modal-filter
              ><b-icon icon="funnel"></b-icon
            ></CButton>
            <download-csv :data="fillterItem" name="listreward.csv">
              <CButton color="dark" variant="outline" class="mx-3"
                ><b-icon icon="download"></b-icon
              ></CButton>
            </download-csv>

            <router-link :to="{ name: 'create reward' }" class="btn btn-success"
              ><b-icon icon="plus"></b-icon>Thêm mới</router-link
            >
          </div>
        </div>
        <Tables
          :items="filterAll ? listReward : fillterItem"
          :fields="fields"
          :itemsPerPage="10"
        >
          <template v-slot:created_at="{ item }">
            <td>
              {{ new Date(item.created_at).toLocaleDateString() }}
            </td>
          </template>
          <template v-slot:action="{ item }">
            <td class="py-2 pl-2 pr-1 d-flex justify-content-center">
              <CButton
                class="mx-1"
                v-b-popover.hover.top="'Xem lịch sử giao dịch'"
                color="info"
                square
                v-on:click="detailRewardById(item.id)"
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
                :key="reset"
              ></date-picker
            ></CCol>
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
    <!-- Modal Detail Reward -->
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
                  <CCol lg="6" class="py-2 text-left">Thời gian</CCol>
                  <CCol lg="6" class="py-2 text-right">{{ this.date }}</CCol>
                </CRow>
              </div>
              <div class="mx-2">
                <CRow>
                  <CCol lg="6" class="py-2 text-left">Tin nhắn</CCol>
                  <CCol lg="6" class="py-2 text-right">{{
                    this.messageReward
                  }}</CCol>
                </CRow>
              </div>
            </div>
          </div>
        </CContainer>
      </div>
    </b-modal>
    <!-- Modal Detail Reward -->
  </div>
</template>

<script>
import Tables from "../../components/common/Tables";
import { tableFields } from "../../utils/table-field";
import { mapGetters, mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "ListReward",
  data() {
    return {
      fields: tableFields.REWARD,
      dataModal: "",
      dataDetail: {},
      startDate: null,
      endDate: null,
      startDateErr: "",
      endDateErr: "",
      fillterItem: [],
      reset: false,
      optionReward: [],
      amount: null,
      transaction_id: null,
      username: "",
      fullName: "",
      messageReward: null,
      date: null,
      filterAll: true,
    };
  },
  components: {
    Tables,
    DatePicker,
  },
  created() {
    this.getListReward();
  },
  computed: {
    ...mapGetters(["listReward", "message", "error", "success"]),
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
    ...mapActions({ getListReward: "getListReward" }),
    filterDate() {
      this.filterAll = !this.filterAll;
      this.fillterItem = this.listReward.filter((dt) => {
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
      this.filterAll = !this.filterAll;
      this.fillterItem = this.listReward;
      this.startDate = null;
      this.endDate = null;
      this.reset = !this.reset;
    },
    detailRewardById(id) {
      this.dataModal = id;
      this.optionReward = this.listReward.filter((item) => item.id == id);
      this.amount = this.optionReward[0].amount;
      this.transaction_id = this.optionReward[0].transaction_id;
      this.username = this.optionReward[0].username;
      this.messageReward = this.optionReward[0].message;
      this.fullName = this.optionReward[0].fullname;
      this.date = this.optionReward[0].created_at;
      this.date = new Date(this.date).toLocaleDateString();
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
.list-reward {
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
