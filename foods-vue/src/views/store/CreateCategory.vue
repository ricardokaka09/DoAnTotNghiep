<template>
  <div class="card-content">
    <CCard class="my-2">
      <CCardBody style="min-height: calc(100vh - 250px)">
        <div
          class="d-flex flex-column justify-content-between"
          style="min-height: calc(100vh - 290px)"
        >
          <CRow>
            <CCol sm="6">
              <CInput
                label="Category Name"
                placeholder="Category Name"
                v-model="name"
              />
            </CCol>
            <CCol sm="6">
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
                  v-on:click.prevent="createNewCategory()"
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
  name: "CreateCategory",
  data() {
    return {
      isLoading: false,
      name: "",
      description: "",
    };
  },
  created() {
    this.$store.commit("set", ["success", false]);
    this.$store.commit("set", ["message", ""]);
    this.$store.commit("set", ["error", false]);
  },
  computed: {
    ...mapGetters(["message", "success", "error"]),
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
    ...mapActions({ createCategory: "createCategory" }),
    createNewCategory() {
      // eslint-disable-next-line no-debugger
      debugger;
      this.isLoading = true;
      if (this.name === "") {
        this.$toaster.error("Please enter category name");
      } else if (this.description === "") {
        this.$toaster.error("Please enter description");
      } else {
        const formData = {
          name: this.name,
          description: this.description,
        };
        this.createCategory(formData);
        this.isLoading = false;
        this.$router.push({ name: "List Category" });
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
