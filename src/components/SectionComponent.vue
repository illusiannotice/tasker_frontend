<script setup lang="ts">
defineProps([
    'title',
    'icon_path'
])
</script>

<template>
    <div class="section flex h-full w-1/2 items-center">
        <img class="  h-9" :src="icon_path">
        <span class=" font-normal text-3xl mx-3">{{ title }}</span>
    </div>
</template>

<style scoped>
.section{
    align-items: center!important;
}
</style>