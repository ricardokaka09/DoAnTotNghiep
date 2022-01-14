<template>
  <div class="list-category">
    <CCard>
      <CCardBody>
        <div class="box-title d-flex justify-content-between">
          <h1 class="title">Sub Category Manage</h1>
          <router-link
            :to="{ name: 'Create SubCategory' }"
            class="btn btn-success"
            ><b-icon icon="plus"></b-icon>Add New</router-link
          >
        </div>
        <Tables :items="listSubCategory" :fields="fields" :itemsPerPage="10">
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
                v-on:click="editSubCategory(item.subCategoryID)"
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
                v-on:click="showConfirm(item.subCategoryID)"
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
                v-on:click="editCategory(item.id)"
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
          <h5>Are you sure delete this subcategory？</h5>
        </div>
        <div class="d-flex justify-content-center">
          <b-button
            class="mx-2 mt-3 btn btn-danger"
            block
            v-on:click.prevent="deleteSubCategory(dataModal)"
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
  name: "ListSubCategory",
  data() {
    return {
      fields: tableFields.SUB_CATEGORY_STORE,
      dataModal: "",
    };
  },
  components: {
    Tables,
  },
  created() {
    this.getListSubCategory();
  },
  computed: {
    ...mapGetters(["success", "error", "message", "listSubCategory"]),
  },
  watch: {
    success() {
      if (this.success) {
        this.$toaster.success(this.message);
        this.$store.commit("set", ["message", ""]);
        this.$store.commit("set", ["success", false]);
        this.getListSubCategory();
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
    ...mapActions({ getListSubCategory: "getListSubCategory" }),
    ...mapActions({ deleteSubCategoryByID: "deleteSubCategoryByID" }),
    showConfirm(id) {
      this.dataModal = id;
    },
    editSubCategory(id) {
      this.$router.push({ name: "Edit SubCategory", params: { id: id } });
    },
    async deleteSubCategory(id) {
      await this.deleteSubCategoryByID(id);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-delete");
      });
      this.getListSubCategory();
    },
  },
};
</script>
