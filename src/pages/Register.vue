<script setup lang="ts">
import { authStore } from '../stores/authStore';
import type { RegisterCredentials } from '../interfaces/apiInterfaces';
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = authStore();
const router = useRouter();
const form: Ref<RegisterCredentials> = ref({
    name:'',
    email: '',
    password: '',
    password_repetition: ''
})

const registerHandler = async () => {

    try {
        await store.register(form.value);
        router.push("/home");
    } catch (error) {
        console.log("failed", error);
    }

};

onMounted( async () => {
    try {
        await store.fetchUser;
    } catch (error) {
        
    }
});


</script>

<template>

    <div class="register w-[100vw] h-[100vh]">
        <div class=" flex justify-center items-center w-full h-full bg-[#212121]">
            <img src="../assets/tasker_logo.svg" class=" scale-150 m-1">
            <h1>TASKER</h1>
        </div>
        <div class="credentials flex bg-[#D9D9D9] w-full h-full items-center justify-center">
            <div class="grid w-[100%] place-items-center gap-y-4">
                <strong class="title text-[3rem] text-[#191919]">Registration</strong>    
                <div class="grid w-[50%]">    
                    <input v-model="form.name" class="m-1 w-[100%] p-3 bg-[#212121] rounded-full border-gray-600 border-solid border caret-white" type="text" placeholder="name">
                    <input v-model="form.email" class="m-1 w-[100%] p-3 bg-[#212121] rounded-full border-gray-600 border-solid border caret-white" type="email" placeholder="email">
                    <input v-model="form.password" class="m-1 w-[100%] p-3 bg-[#212121] rounded-full border-gray-600 border-solid border caret-white" type="password" placeholder="password">
                    <input v-model="form.password_repetition" class="m-1 w-[100%] p-3 bg-[#212121] rounded-full border-gray-600 border-solid border caret-white" type="password" placeholder="repeat password">
                </div>
                <button @click="registerHandler">Register</button>
            </div>
        </div>
    </div>

</template>

<style scoped>

    .register{
        display: grid;
        grid-template-columns: 2fr 1fr;
        place-items: center;
    }
    .title, h1{
        font-family: 'jetbrainsExtrabold';
    }
    
</style>