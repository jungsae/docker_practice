export const itemRoutes = [
  {
    path: "/items",
    name: "ItemList",
    component: () => import("@/views/ItemList.vue"),
  },
  {
    path: "/items/manage",
    name: "ItemList",
    component: () => import("@/views/itemListManage.vue"),
  },
  {
    path: "/item/new",
    name: "ItemCreate",
    component: () => import("@/views/ItemCreate.vue"),
  },
];
