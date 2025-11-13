import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Main from "../pages/Main.vue";
import { authStore } from "../stores/authStore";

const routes = [
  { 
    path: "/login",
    component: Login,
    meta: { requiresAuth: false } 
  },
  
  { 
    path: "/register",
    component: Register,
    meta: { requiresAuth: false } 
  },
  
  { 
    path: "/home",
    component: Main,
    meta: { requiresAuth: false } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = authStore();

  if (!store.user && !store.loading) {
    try {
      await store.fetchUser();
    } catch (error) {

    }
  }

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresGuest && store.isAuthenticated) {
    next("/home");
  } else {
    next();
  }
});
export default router;
