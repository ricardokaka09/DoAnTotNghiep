<template>
  <div class="list-category">
    <CCard>
      <CCardBody>
        <div class="box-title d-flex justify-content-between">
          <h1 class="title">Product Manage</h1>
          <router-link :to="{ name: 'Create Product' }" class="btn btn-success"
            ><b-icon icon="plus"></b-icon>Add New</router-link
          >
        </div>
        <Tables :items="listProduct" :fields="fields" :itemsPerPage="10">
          <template v-slot:createdAt="{ item }">
            <td>
              {{ new Date(item.createdAt).toLocaleDateString() }}
            </td>
          </template>
          <template v-slot:action="{ item }">
            <td class="py-2 pl-2 pr-1 d-flex justify-content-center">
              <CButton
                class="mx-1"
                v-b-popover.hover.top="'Chỉnh sửa'"
                color="primary"
                square
                v-on:click="editCategory(item.productID)"
                variant="outline"
                size="sm"
              >
                <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
              </CButton>
              <CButton
                class="mx-1"
                v-b-popover.hover.top="'Xóa'"
                color="danger"
                square
                v-on:click="showConfirm(item.productID)"
                variant="outline"
                size="sm"
                v-b-modal.modal-delete
              >
                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
              </CButton>
              <CButton
                class="mx-1"
                v-b-popover.hover.top="'Xem thông tin chi tiết'"
                color="info"
                square
                v-on:click="editCategory(item.productID)"
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
    <div>
      <b-modal id="modal-delete" hide-header hide-footer>
        <div class="d-block text-center">
          <h5>Are you sure delete this category？</h5>
        </div>
        <div class="d-flex justify-content-center">
          <b-button
            class="mx-2 mt-3 btn btn-danger"
            block
            v-on:click.prevent="deteleProduct(dataModal)"
            >Delete</b-button
          >
          <b-button
            class="mx-2 mt-3 btn btn-secondary"
            block
            @click="$bvModal.hide('modal-delete')"
          >
            Cancel
          </b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Tables from "../../components/common/Tables";
import { tableFields } from "../../utils/table-field";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ListCategory",
  data() {
    return {
      fields: tableFields.PRODUCT,
      dataModal: "",
    };
  },
  components: {
    Tables,
  },
  created() {
    this.getListProduct();
  },
  computed: {
    ...mapGetters(["success", "error", "listProduct", "message"]),
  },
  watch: {
    success() {
      if (this.success) {
        this.$toaster.success(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
        this.getListProduct();
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
    ...mapActions({ getListProduct: "getListProduct" }),
    ...mapActions({ deteleProductByID: "deteleProductByID" }),
    showConfirm(id) {
      this.dataModal = id;
      console.log(this.dataModal);
    },
    editCategory(id) {
      this.$router.push({ name: "edit subcategory", params: { id: id } });
    },
    async deteleProduct(id) {
      await this.deteleProductByID(id);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-delete");
      });
      setTimeout(() => {
        this.$router.go();
      }, 2000);
    },
  },
};
</script>
