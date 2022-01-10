<template>
  <div>
    <div
      class="breadcrumb-section set-bg"
      v-bind:style="{ 'background-image': 'url(' + imgBreadcrumb + ')' }"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <div class="breadcrumb__text">
              <h2>Blog</h2>
              <div class="breadcrumb__option">
                <router-link :to="{ name: 'home' }"> Home </router-link>
                <span>Blog</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="blog spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-5">
            <div class="blog__sidebar">
              <div class="blog__sidebar__search">
                <form action="#">
                  <input type="text" placeholder="Search..." />
                  <button type="submit">
                    <span class="icon_search"></span>
                  </button>
                </form>
              </div>
              <div class="blog__sidebar__item">
                <h4>Recent News</h4>
                <div class="blog__sidebar__recent">
                  <router-link
                    :to="{ name: '#' }"
                    class="blog__sidebar__recent__item"
                    v-for="item in dataBlogRecent"
                    :key="item.id"
                  >
                    <div class="blog__sidebar__recent__item__pic">
                      <img :src="item.img" alt="" />
                    </div>
                    <div class="blog__sidebar__recent__item__text">
                      <h6>
                        {{ item.title }}
                      </h6>
                      <span>{{ item.date }}</span>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="blog__sidebar__item">
                <h4>Search By</h4>
                <div class="blog__sidebar__item__tags">
                  <a href="#">Apple</a>
                  <a href="#">Beauty</a>
                  <a href="#">Vegetables</a>
                  <a href="#">Fruit</a>
                  <a href="#">Healthy Food</a>
                  <a href="#">Lifestyle</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-7">
            <div class="row">
              <div
                class="col-lg-6 col-md-6 col-sm-6"
                v-for="item in dataBlog2"
                :key="item.id"
              >
                <div class="blog__item">
                  <div class="blog__item__pic">
                    <img :src="item.img" alt="" />
                  </div>
                  <div class="blog__item__text">
                    <ul>
                      <li>
                        <b-icon icon="calendar" aria-hidden="true"></b-icon>
                        {{ item.date }}
                      </li>
                      <li>
                        <b-icon icon="chat-left" aria-hidden="true"></b-icon>
                        {{ item.comment }}
                      </li>
                    </ul>
                    <h5>
                      <router-link :to="{ name: '#' }">{{
                        item.title
                      }}</router-link>
                    </h5>
                    <p>
                      {{ item.content }}
                    </p>
                    <router-link
                      :to="{ name: 'blog detail', params: { id: item.id } }"
                      class="blog__btn"
                      >READ MORE
                      <b-icon icon="arrow-right" aria-hidden="true"></b-icon
                    ></router-link>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="product__pagination blog__pagination">
                  <a href="#">1</a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#"
                    ><b-icon icon="arrow-right" aria-hidden="true"></b-icon
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import imgBreadcrumb from "../../assets/img/breadcrumb.jpg";
import img1 from "../../assets/img/blog/sidebar/sr-1.jpg";
import img2 from "../../assets/img/blog/sidebar/sr-2.jpg";
import img3 from "../../assets/img/blog/sidebar/sr-3.jpg";
import imgBlog1 from "../../assets/img/blog/blog-1.jpg";
import imgBlog2 from "../../assets/img/blog/blog-2.jpg";
import imgBlog3 from "../../assets/img/blog/blog-3.jpg";
import imgBlog4 from "../../assets/img/blog/blog-4.jpg";
import imgBlog5 from "../../assets/img/blog/blog-5.jpg";
import imgBlog6 from "../../assets/img/blog/blog-6.jpg";
export default {
  name: "BlogPage",
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
      dataBlogRecent: [
        {
          id: 1,
          img: img1,
          title: "09 Kinds Of Vegetables Protect The Liver",
          date: "MAR 05, 2019",
        },
        {
          id: 2,
          img: img2,
          title: "09 Kinds Of Vegetables Protect The Liver",
          date: "MAR 05, 2019",
        },
        {
          id: 3,
          img: img3,
          title: "09 Kinds Of Vegetables Protect The Liver",
          date: "MAR 05, 2019",
        },
      ],
      dataBlog2: [
        {
          id: 1,
          img: imgBlog1,
          title: "6 ways to prepare breakfast for 30",
          date: "MAR 05, 2019",
          content:
            "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliqua mquaerat",
          comment: 5,
        },
        {
          id: 2,
          img: imgBlog2,
          title: "Visit the clean farm in the US",
          date: "MAR 05, 2019",
          content:
            "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliqua mquaerat",
          comment: 5,
        },
        {
          id: 3,
          img: imgBlog3,
          title: "Cooking tips make cooking simple",
          date: "MAR 05, 2019",
          content:
            "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliqua mquaerat",
          comment: 5,
        },
        {
          id: 5,
          img: imgBlog5,
          title: "Cooking tips make cooking simple",
          date: "MAR 05, 2019",
          content:
            "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliqua mquaerat",
          comment: 5,
        },
        {
          id: 4,
          img: imgBlog4,
          title: "The Moment You Need To Remove Garlic From The Menu",
          date: "MAR 05, 2019",
          content:
            "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliqua mquaerat",
          comment: 5,
        },
        {
          id: 6,
          img: imgBlog6,
          title: "Cooking tips make cooking simple",
          date: "MAR 05, 2019",
          content:
            "Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliqua mquaerat",
          comment: 5,
        },
      ],
    };
  },
};
</script>
