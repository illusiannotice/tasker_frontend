<script setup lang="ts"></script>

<template>    
    <div class="login w-[100vw] h-[100vh]">
        <div class=" flex justify-center items-center w-full h-full bg-[#212121]">
            <img src="../assets/tasker_logo.svg" class=" scale-150 m-1">
            <h1>TASKER</h1>
        </div>
        <div class="credentials flex bg-[#D9D9D9] w-full h-full items-center justify-center">
            <div class="grid w-[100%] place-items-center gap-y-4">
                <strong class="title text-[3rem] text-[#191919]">Login</strong>    
                <div class="grid w-[50%]">    
                    <input class="m-1 w-[100%] p-3 bg-[#212121] rounded-full border-gray-600 border-solid border caret-white" type="email" placeholder="email">
                    <input class="m-1 w-[100%] p-3 bg-[#212121] rounded-full border-gray-600 border-solid border caret-white" type="password" placeholder="password">
                </div>
                <button>Login</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .login{
        display: grid;
        grid-template-columns: 2fr 1fr;
        place-items: center;
    }
    .title, h1{
        font-family: 'jetbrainsExtrabold';
    }
</style>