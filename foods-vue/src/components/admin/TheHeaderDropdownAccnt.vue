<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="@/assets/img/mem.png" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Tài khoản</strong>
    </CDropdownHeader>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Cài đặt</strong>
    </CDropdownHeader>
    <CDropdownItem> <CIcon name="cil-user" /> Thông tin cá nhân </CDropdownItem>
    <CDropdownItem> <CIcon name="cil-settings" /> Cài đặt </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem v-on:click.prevent="logout()">
      <CIcon name="cil-lock-locked" /> Đăng xuất
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { Constants } from "../../utils/constants";
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.removeItem(Constants.TOKEN);
      localStorage.removeItem(Constants.ROLE);
      this.$router.push({ name: "login admin" });
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
