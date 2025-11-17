<script setup lang="ts">
defineEmits(['click'])

</script>

<template>
    <button class="  h-fit" @click="$emit('click')">
        <img class=" w-5" src="../assets/icons/add_icon.svg">
    </button>
</template>

<style scoped>
</style>