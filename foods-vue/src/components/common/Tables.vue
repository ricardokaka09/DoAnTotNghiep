<template>
  <div>
    <CDataTable
      :items="items"
      :fields="fields"
      column-filter
      table-filter
      :items-per-page-select="itemsPerPageSelect"
      :items-per-page="itemsPerPage"
      :noItemsView="noItemsPage"
      :tableFilter="filterTable"
      :clickableRows="clickableRows"
      hover
      sorter
      pagination
    >
      <template
        v-for="(x, slotName) in $scopedSlots"
        v-slot:[slotName]="context"
      >
        <slot :name="slotName" v-bind="context" />
      </template>
    </CDataTable>
  </div>
</template>

<script>
export default {
  name: "Tables",
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    itemsPerPage: {
      type: Number,
      default: 50,
    },
    clickableRows: {
      type: Boolean,
      default: false,
    },
    itemsPerPageSelect: {
      type: Object,
      default() {
        return { label: "Số mục trên mỗi trang:", values: [50, 100, 200] };
      },
    },
    noItemsPage: {
      type: Object,
      default() {
        return {
          noResults: "Không có kết quả",
          noItems: "Không có thông tin nào hiện có",
        };
      },
    },
    filterTable: {
      type: Object,
      default() {
        return { label: "Tìm kiếm:", placeholder: "Nhập kí tự bất kì..." };
      },
    },
  },
};
</script>
