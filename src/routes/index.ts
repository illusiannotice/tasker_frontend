import { createRouter, createWebHistory } from 'vue-router';
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Main from "../pages/Main.vue";

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register},
    { path: '/home', component: Main }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

