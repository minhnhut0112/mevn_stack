import { createWebHistory, createRouter } from "vue-router";

const requireAuth = (to, from, next) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    next({ name: "login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "product.list",
    component: () => import("@/views/products/List.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/product/create",
    name: "product.create",
    component: () => import("@/views/products/Form.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/product/edit/:id",
    name: "product.edit",
    component: () => import("@/views/products/Form.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/users",
    name: "user.list",
    component: () => import("@/views/users/List.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/user/edit/:id",
    name: "user.edit",
    component: () => import("@/views/users/Form.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/orders",
    name: "order.list",
    component: () => import("@/views/orders/List.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/orders/edit/:id",
    name: "order.edit",
    component: () => import("@/views/orders/Form.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/users/LoginPage.vue"),
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
