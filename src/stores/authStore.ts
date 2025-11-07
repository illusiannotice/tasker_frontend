import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const authStore = defineStore('auth',() => {
    const user = ref(null);
    const token = ref(localStorage.getItem('token'));
    const loading = ref(false);

    const isAuthenticated = computed(() => !!token.value);

});


