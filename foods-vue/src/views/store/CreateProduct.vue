<template>
  <div class="card-content">
    <CCard class="my-2">
      <CCardBody style="min-height: calc(100vh - 250px)">
        <div
          class="d-flex flex-column justify-content-between"
          style="min-height: calc(100vh - 290px)"
        >
          <CRow>
            <CCol sm="6" class="mb-3">
              <label>Category Name</label>
              <b-form-select
                v-model="categoryID"
                :options="optionsCategory"
              ></b-form-select>
            </CCol>
            <CCol sm="6" class="mb-3">
              <label>SubCategory Name</label>
              <b-form-select
                v-model="subCategoryID"
                :options="optionsSubCategory"
              ></b-form-select>
            </CCol>
            <CCol sm="6" class="mb-3">
              <CInput
                label="Product Name"
                placeholder="Product Name"
                v-model="productName"
              />
            </CCol>
            <CCol sm="6" class="mb-3">
              <CTextarea
                label="Description"
                placeholder="Description"
                v-model="description"
              />
            </CCol>
            <CCol sm="4" class="mb-3">
              <CInput
                label="Price"
                placeholder="Price"
                v-model="price"
                type="number"
              />
            </CCol>
            <CCol sm="4" class="mb-3">
              <CInput
                label="Min Price"
                placeholder="Min Price"
                v-model="minPrice"
                type="number"
              />
            </CCol>
            <CCol sm="4" class="mb-3">
              <CInput
                label="Quantity"
                placeholder="Quantity"
                v-model="quantity"
                type="number"
              />
            </CCol>
            <CCol sm="6" class="mb-3">
              <CInput label="Origin" placeholder="Origin" v-model="origin" />
            </CCol>
            <CCol sm="6" class="mb-3">
              <CInput
                label="Trademark"
                placeholder="Trademark"
                v-model="trademark"
              />
            </CCol>
            <CCol sm="6">
              <CInput label="Photos" placeholder="Photos" v-model="image" />
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
                  v-on:click.prevent="createNewProduct()"
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
      categoryID: "",
      productName: "",
      description: "",
      subCategoryID: "",
      price: null,
      minPrice: null,
      origin: "",
      quantity: null,
      trademark: "",
      image: null,
      optionsCategory: [],
      optionsSubCategory: [],
      dataSubCate: [],
    };
  },
  created() {
    this.getListCategory();
    this.getListSubCategory();
  },
  computed: {
    ...mapGetters([
      "message",
      "success",
      "error",
      "listCategory",
      "listSubCategory",
    ]),
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
    categoryID() {
      this.dataSubCate = this.listSubCategory.filter(
        (item) => item.categoryID == this.categoryID
      );
      this.optionsSubCategory = this.dataSubCate.map((item) => ({
        text: item.name,
        value: item.subCategoryID,
      }));
    },
  },
  methods: {
    ...mapActions({ createProduct: "createProduct" }),
    ...mapActions({ getListCategory: "getListCategory" }),
    ...mapActions({ getListSubCategory: "getListSubCategory" }),
    createNewProduct() {
      // eslint-disable-next-line no-debugger
      debugger;
      this.isLoading = true;
      if (this.productName === "") {
        this.$toaster.error("Please enter Product Name");
        this.isLoading = false;
      } else if (this.description === "") {
        this.$toaster.error("Please enter Description");
        this.isLoading = false;
      } else if (this.categoryID === "") {
        this.$toaster.error("Please select Category");
        this.isLoading = false;
      } else if (this.subCategoryID === "") {
        this.$toaster.error("Please select SubCategory");
        this.isLoading = false;
      } else if (this.price === null || this.price < 0) {
        this.$toaster.error("Invalid Price");
        this.isLoading = false;
      } else if (this.minPrice > this.price || this.minPrice < 0) {
        this.$toaster.error("Invalid Min Price");
        this.isLoading = false;
      } else if (this.quantity === null || this.quantity < 0) {
        this.$toaster.error("Invalid Quantity");
        this.isLoading = false;
      } else {
        const formData = {
          name: this.productName,
          categoryID: this.categoryID,
          subCategoryID: this.subCategoryID,
          description: this.description,
          price: parseInt(this.price),
          minPrice: parseInt(this.minPrice),
          quantity: parseInt(this.quantity),
          origin: this.origin,
          trademark: this.trademark,
          photos: [this.image],
        };
        this.createProduct(formData);
        this.isLoading = false;
        this.$router.push({ name: "List Product Store" });
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
