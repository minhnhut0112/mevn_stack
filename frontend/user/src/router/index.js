import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: HomePage,
  },
  {
    path: "/type/:type",
    name: "typepage",
    component: () => import("@/views/TypeProduct.vue"),
  },
  {
    path: "/productdetails/:id",
    name: "productdetails",
    component: () => import("@/views/ProductDetails.vue"),
  },
  {
    path: "/cartpage",
    name: "cartpage",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("@/views/CheckOutPage.vue"),
  },
  {
    path: "/ordersuccess",
    name: "ordersuccess",
    component: () => import("@/views/OrderSuccess.vue"),
  },
  {
    path: "/sign-in",
    name: "signin",
    component: () => import("@/views/SignInPage.vue"),
  },
  {
    path: "/sign-up",
    name: "signup",
    component: () => import("@/views/SignUpPage.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: "/orderpage",
    name: "orderpage",
    component: () => import("@/views/OrderPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
