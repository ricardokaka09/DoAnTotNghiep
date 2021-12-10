<template>
  <div></div>
</template>

<script>
import { Api } from "../../utils/http-common";
export default {
  name: "ActiveMail",
  created() {
    // eslint-disable-next-line no-debugger
    debugger;
    const { query } = this.$route;
    console.log(query.token);
    Api.requestServer1
      .post(
        `${process.env.VUE_APP_ROOT_API}/users/verifying?token=${query.token}`
      )
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data === true) {
          this.$toaster.success("Bạn đã active đăng ký thành công");
          this.$store.commit("set", ["success", false]);
          this.$store.commit("set", ["message", ""]);
          this.$router.push({ name: "login" });
        } else {
          this.$toaster.error("Đăng ký không thành công");
          this.$store.commit("set", ["message", ""]);
          this.$store.commit("set", ["error", false]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
