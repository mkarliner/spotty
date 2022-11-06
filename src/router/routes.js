const routes = [
  {
    path: "/",
    component: () => import("layouts/SimpleLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/settings",
    component: () => import("layouts/SimpleLayout.vue"),
    children: [{ path: "", component: () => import("pages/SettingsPage.vue") }],
  },

  {
    path: "/map",
    component: () => import("layouts/SimpleLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/log",
    component: () => import("layouts/SimpleLayout.vue"),
    children: [{ path: "", component: () => import("pages/LogPage.vue") }],
  },

  {
    path: "/status",
    component: () => import("layouts/SimpleLayout.vue"),
    children: [{ path: "", component: () => import("pages/StatusPage.vue") }],
  },

  {
    path: "/help",
    component: () => import("layouts/SimpleLayout.vue"),
    children: [{ path: "", component: () => import("pages/HelpPage.vue") }],
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
