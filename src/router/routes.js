const routes = [
  {
    path: "/",
    component: () => import("layouts/SimpleLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  // {
    // path: "/",
    // component: () => import("layouts/SimpleLayout.vue"),
    // children: [{ path: "", component: () => import("pages/MQTTPage.vue") }],
    // component: () => import('components/MQTT.vue')
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
