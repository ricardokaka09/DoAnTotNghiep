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
              <label>Category Name</label>
              <b-form-select
                v-model="categoryID"
                :options="optionsCategory"
              ></b-form-select>
            </CCol>
            <CCol sm="4">
              <CInput
                label="SubCategory Name"
                placeholder="Category Name"
                v-model="name"
              />
            </CCol>
            <CCol sm="4">
              <CTextarea
                label="Description"
                placeholder="Description"
                v-model="description"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <div class="d-flex justify-content-center">
                <CButton
                  :color="'info'"
                  :size="'lg'"
                  class="mt-3 mx-2"
                  :disabled="isLoading"
                  v-on:click.prevent="createNewSubCategory()"
                >
                  Confirm
                </CButton>
                <CButton :color="'secondary'" :size="'lg'" class="mt-3 mx-2">
                  Cancel
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CreateSubCategory",
  data() {
    return {
      isLoading: false,
      name: "",
      description: "",
      optionsCategory: [],
      categoryID: "",
    };
  },
  created() {
    this.getListCategory();
  },
  computed: {
    ...mapGetters(["message", "success", "error", "listCategory"]),
  },
  watch: {
    listCategory() {
      this.optionsCategory = this.listCategory.map((item) => ({
        text: item.name,
        value: item.categoryID,
      }));
    },
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
    ...mapActions({ createSubCategory: "createSubCategory" }),
    ...mapActions({ getListCategory: "getListCategory" }),
    createNewSubCategory() {
      // eslint-disable-next-line no-debugger
      debugger;
      this.isLoading = true;
      if (this.name === "") {
        this.$toaster.error("Please enter subcategory name");
      } else if (this.description === "") {
        this.$toaster.error("Please enter description");
      } else if (this.categoryID === "") {
        this.$toaster.error("Please select Category");
      } else {
        const formData = {
          categoryID: this.categoryID,
          name: this.name,
          description: this.description,
        };
        this.createSubCategory(formData);
        this.isLoading = false;
        this.$router.push({ name: "List SubCategory" });
      }
    },
  },
};
</script>
<style lang="scss">
.form-control {
  padding-left: 10px;
}
</style>
