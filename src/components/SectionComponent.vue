<script setup lang="ts">
import { authStore } from '../stores/authStore';
defineProps([
    'title',
    'icon_path'
])
const store = authStore();
const click_handler = (title: string) => {
    if(title == 'log out')
    { 
        store.logout();
        window.location.href = "http://127.0.0.1:5173/login";
    }
}
</script>

<template>
    <button class="section flex h-full w-1/2 items-center" @click="click_handler(title)">
        <img class="  h-9" :src="icon_path">
        <span class=" font-normal text-3xl mx-3">{{ title }}</span>
    </button>
</template>

<style scoped>
.section{
    align-items: center!important;
}
</style>