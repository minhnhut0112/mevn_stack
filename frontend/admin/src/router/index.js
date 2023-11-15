import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "product.list",
    component: () => import("@/views/products/List.vue"),
  },
  {
    path: "/product/create",
    name: "product.create",
    component: () => import("@/views/products/Form.vue"),
  },
  {
    path: "/product/edit/:id",
    name: "product.edit",
    component: () => import("@/views/products/Form.vue"),
  },
  {
    path: "/users",
    name: "user.list",
    component: () => import("@/views/users/List.vue"),
  },
  {
    path: "/user/edit/:id",
    name: "user.edit",
    component: () => import("@/views/users/Form.vue"),
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "notfound",
  //   component: () => import("@/views/NotFound.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
