<template>
  <div></div>
</template>

<script>
import { Api } from "../../utils/http-common";
export default {
  name: "ActiveMail",
  created() {
    const { query } = this.$route;
    console.log(query.token);
    Api.requestServer1
      .get(`users/verifying`, {
        headers: { token: `${query.token}` },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data === true) {
          this.$toaster.success("Bạn đã đăng ký thành công");
          this.$router.push({ name: "login user" });
        } else {
          this.$toaster.error("Đăng ký không thành công");
          this.$router.push({ name: "login user" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
