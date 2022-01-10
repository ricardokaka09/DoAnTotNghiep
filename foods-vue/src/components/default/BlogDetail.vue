<template>
  <div>
    <div
      class="breadcrumb-section set-bg"
      v-bind:style="{ 'background-image': 'url(' + imgBreadcrumb + ')' }"
    >
      <div class="container">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="blog__details__hero__text">
                <h2>The Moment You Need To Remove Garlic From The Menu</h2>
                <ul>
                  <li>By Hà Duy Phương</li>
                  <li>December 10, 2021</li>
                  <li>8 Comments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="blog-details spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-5 order-md-1 order-2">
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
          <div class="col-lg-8 col-md-7 order-md-1 order-1">
            <div class="blog__details__text">
              <img :src="imgDetail" alt="" />
              <p>
                Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                vehicula elementum sed sit amet dui. Curabitur non nulla sit
                amet nisl tempus convallis quis ac lectus. Mauris blandit
                aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna
                justo, lacinia eget consectetur sed, convallis at tellus. Sed
                porttitor lectus nibh. Donec sollicitudin molestie malesuada.
                Curabitur non nulla sit amet nisl tempus convallis quis ac
                lectus. Proin eget tortor risus. Donec rutrum congue leo eget
                malesuada. Curabitur non nulla sit amet nisl tempus convallis
                quis ac lectus. Donec sollicitudin molestie malesuada. Nulla
                quis lorem ut libero malesuada feugiat. Curabitur arcu erat,
                accumsan id imperdiet et, porttitor at sem.
              </p>
              <h3>
                The corner window forms a place within a place that is a resting
                point within the large space.
              </h3>
              <p>
                The study area is located at the back with a view of the vast
                nature. Together with the other buildings, a congruent story has
                been managed in which the whole has a reinforcing effect on the
                components. The use of materials seeks connection to the main
                house, the adjacent stables
              </p>
            </div>
            <div class="blog__details__content">
              <div class="row">
                <div class="col-lg-6">
                  <div class="blog__details__author">
                    <div class="blog__details__author__pic">
                      <img :src="imgAuthor" alt="" />
                    </div>
                    <div class="blog__details__author__text">
                      <h6>Michael Scofield</h6>
                      <span>Admin</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="blog__details__widget">
                    <ul>
                      <li><span>Categories:</span> Food</li>
                      <li>
                        <span>Tags:</span> All, Trending, Cooking, Healthy Food,
                        Life Style
                      </li>
                    </ul>
                    <div class="blog__details__social">
                      <a href="#"><i class="fa fa-facebook"></i></a>
                      <a href="#"><i class="fa fa-twitter"></i></a>
                      <a href="#"><i class="fa fa-google-plus"></i></a>
                      <a href="#"><i class="fa fa-linkedin"></i></a>
                      <a href="#"><i class="fa fa-envelope"></i></a>
                    </div>
                  </div>
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
import imgDetail from "../../assets/img/blog/details/details-pic.jpg";
import imgAuthor from "../../assets/img/blog/details/details-author.jpg";
export default {
  name: "BlogDetail",
  data() {
    return {
      imgBreadcrumb: imgBreadcrumb,
      imgDetail: imgDetail,
      imgAuthor: imgAuthor,
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
    };
  },
};
</script>
