<template>
  <div class="header d-flex flex-column">
    <div class="header-pc">
      <div class="container d-flex flex-column">
        <div
          class="header-top d-flex align-items-center justify-content-between"
        >
          <div class="logo">
            <router-link :to="{ name: 'store' }">
              <img src="../../assets/img/img103.png" alt="logo" />
            </router-link>
          </div>
          <div class="search-bar">
            <div class="mb-3 d-flex">
              <input
                type="search"
                placeholder="商品名または目次で検索"
                class="input-search"
              />
              <button variant="primary" type="submit" class="btn-search">
                <font-awesome-icon
                  class="sidebar-icon"
                  :icon="['fas', 'search']"
                />
              </button>
            </div>
          </div>
          <div class="nav">
            <ul
              class="d-flex justify-content-between"
              :class="{ active: isActive }"
            >
              <li class="">
                <router-link :to="{ name: 'library' }">
                  ライブラリ
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'store' }" class="">
                  ショップ
                </router-link>
              </li>
            </ul>
          </div>
          <div class="link-cart">
            <router-link :to="{ name: 'default cart' }">
              <font-awesome-icon
                class="sidebar-icon"
                :icon="['fas', 'shopping-cart']"
              />
            </router-link>
            <div class="cart-length">{{ listCart.length }}</div>
          </div>
          <div class="btn-Tabs" id="show-btn" @click="() => showModalMenu()">
            <img src="../../assets/img/iconmenu.png" alt="iconMenu" />
          </div>

          <div class="popup" v-if="showModal">
            <div class="popup-inner">
              <slot />
              <div class="modal-menu-default">
                <div class="modal-menu-main d-flex flex-column">
                  <div class="d-flex my-5">
                    <div class="menu-item d-flex flex-column">
                      <img :src="imgMenu" alt="menu-item" class="img-menu" />
                      <div class="text-menu">期間限定ニュース</div>
                    </div>
                    <div class="menu-item d-flex flex-column">
                      <img :src="imgNote" alt="menu-item" class="img-menu" />
                      <div class="text-menu">ノート確認</div>
                    </div>
                    <div class="menu-item d-flex flex-column">
                      <img :src="imgSearch" alt="menu-item" class="img-menu" />
                      <div class="text-menu">検索</div>
                    </div>
                    <div class="menu-item d-flex flex-column">
                      <img :src="imgContact" alt="menu-item" class="img-menu" />
                      <div class="text-menu">お問い合わせ</div>
                    </div>
                  </div>
                  <div class="d-flex mt-5">
                    <div class="menu-item d-flex flex-column">
                      <img :src="imgMember" alt="menu-item" class="img-menu" />
                      <div class="text-menu">メンバーページ</div>
                    </div>
                    <div class="menu-item d-flex flex-column">
                      <img :src="imgHelp" alt="menu-item" class="img-menu" />
                      <div class="text-menu">ヘルプ</div>
                    </div>
                    <div
                      class="menu-item d-flex flex-column logout"
                      v-on:click="logoutBtn()"
                    >
                      <img :src="imgLogout" alt="menu-item" class="img-menu" />
                      <div class="text-menu">ログアウト</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="hiden-modal-menu"
            @click="showModalMenu()"
            v-if="showModal"
          ></div>
        </div>
        <div class="search-bar-sp">
          <div class="mb-3 d-flex">
            <input
              type="search"
              placeholder="商品名または目次で検索"
              class="input-search"
            />
            <button variant="primary" type="submit" class="btn-search">
              <font-awesome-icon
                class="sidebar-icon"
                :icon="['fas', 'search']"
              />
            </button>
          </div>
        </div>
        <div class="menu-pc">
          <ul class="d-flex justify-content-between">
            <li>
              <router-link :to="{ name: 'history point' }">
                ポイントボーナス履歴</router-link
              >
            </li>
            <li>
              <router-link :to="{ name: '/' }">メニュー２</router-link>
            </li>
            <li>
              <router-link :to="{ name: '/' }">メニュー1AB</router-link>
            </li>
            <li>
              <router-link :to="{ name: '/' }">外部リンクテスト</router-link>
            </li>
            <li>
              <router-link :to="{ name: '/' }">テスト</router-link>
            </li>
            <li class="menu_activity_log">
              <router-link :to="{ name: '/' }">行動ログを見る</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imgMember from "@/assets/img/menu_member.png";
import imgLogout from "@/assets/img/menu_logout.png";
import imgMenu from "@/assets/img/menu_news.png";
import imgHelp from "@/assets/img/menu_help.png";
import imgContact from "@/assets/img/menu_contact.png";
import imgSearch from "@/assets/img/menu_search.png";
import imgNote from "@/assets/img/menu_note.png";
import { mapActions, mapGetters } from "vuex";
import { Constants } from "../../utils/constants";

export default {
  name: "Header",
  data() {
    return {
      isActive: false,
      showModal: false,
      imgMember: imgMember,
      imgLogout: imgLogout,
      imgHelp: imgHelp,
      imgContact: imgContact,
      imgSearch: imgSearch,
      imgMenu: imgMenu,
      imgNote: imgNote,
    };
  },
  created() {
    const shop_id = localStorage.getItem(Constants.SHOP_ID);
    this.getListCart({
      shop_id,
    });
  },
  computed: {
    ...mapGetters(["listCart", "success", "error"]),
  },
  methods: {
    ...mapActions({ logout: "logout" }),
    ...mapActions({ getListCart: "getListCart" }),
    toggleNav() {
      this.isActive = !this.isActive;
      this.$emit("toggleNav", this.isActive);
    },
    showModalMenu() {
      this.showModal = !this.showModal;
    },
    logoutBtn() {
      localStorage.clear();
      this.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
