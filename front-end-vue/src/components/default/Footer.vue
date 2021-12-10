<template>
  <div class="footer">
    <div class="footer-pc">
      <div class="container">
        <div class="footer-top">
          <ul>
            <li>
              <router-link :to="{ name: '/' }">
                このサイトについて
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: '/' }"> お問い合わせ </router-link>
            </li>
            <li>
              <router-link :to="{ name: '/' }"> よくあるご質問 </router-link>
            </li>
          </ul>
        </div>
        <div class="footer-bottom">
          <small>Copyright © 2021 . All Rights Reserved.</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
