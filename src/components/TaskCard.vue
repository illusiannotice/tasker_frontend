<script setup lang="ts">
import { ref } from 'vue';
defineProps([
        'state',
        'title',
        'description'
    ]);
const showDescription = ref(false);
</script>

<template>
    <div class="task-card flex justify-between w-2/6 rounded-full items-center px-3 bg-[#2C2C2C]">
        <img class=" scale-75" v-if="state" src="../assets/icons/check_box_outline.svg">
        <img class=" scale-75" v-else src="../assets/icons/check_box_outline_blank.svg">
        <strong class=" text-xl">{{ title }}</strong>
        <img class=" scale-75" v-if="state" src="../assets/icons/arrow_dark.svg">
        <img class=" scale-75" v-else src="../assets/icons/vector_light.svg">
    </div>
</template>

<style scoped>
</style>