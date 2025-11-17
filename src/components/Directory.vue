<script setup lang="ts">

defineProps([
    'name'
])

defineEmits(['click'])

</script>

<template>

    <div class="grid place-items-center w-fit h-fit" @click="$emit('click')">
        
        <img src="../assets/icons/folder.png" class=" h-12 w-12">
        <span>{{ name }}</span>

    </div>

</template>

<style scoped></style>