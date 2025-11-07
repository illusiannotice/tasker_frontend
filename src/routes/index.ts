import { createRouter, createWebHistory } from 'vue-router';
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Main from "../pages/Main.vue";

const routes = [
    { path: '/login', name: 'login', component: Login },
    { path: '/register',  name: 'register', component: Register},
    { path: '/', name: 'main', component: Main }
]

export const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes,
});



