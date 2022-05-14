const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      { path: "sign-in", component: () => import("pages/SignInPage.vue") },
      {
        path: "feed",
        component: () => import("pages/FeedPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
