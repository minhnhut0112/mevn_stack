import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: HomePage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/admin",
    name: "adminpage",
    component: () => import("@/views/AdminPage.vue"),
  },
  {
    path: "/type",
    name: "typepage",
    component: () => import("@/views/TypeProduct.vue"),
  },
  {
    path: "/productdetails",
    name: "productdetails",
    component: () => import("@/views/ProductDetails.vue"),
  },
  {
    path: "/cartpage",
    name: "cartpage",
    component: () => import("@/views/CartPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
