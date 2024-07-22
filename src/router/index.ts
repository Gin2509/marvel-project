import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/home/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: '/details/:id/:title',
    name: "details",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/details/DetailsView.vue"),
  },
  {
    path: '/history',
    name: "history",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/history/HistoryView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
