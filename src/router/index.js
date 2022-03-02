import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/luckDraw",
  },
  {
    path: "/luckDraw",
    name: "luckDraw",
    component: () => import("@/views/luckDraw.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
