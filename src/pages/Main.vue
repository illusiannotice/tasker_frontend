<script setup lang="ts">
import TaskCard from "../components/TaskCard.vue";
import AddButton from "../components/AddButton.vue";
import SectionComponent from "../components/SectionComponent.vue";
import { type sectionInterface } from "@/interfaces/sectionInterface";
const sections: Array<sectionInterface> = [
    {
        title : "main",
        path : "src/assets/icons/home.svg"
    },
    {
        title: 'account',
        path: 'src/assets/icons/account_circle.svg',
    },
    {
        title: 'log out',
        path: 'src/assets/icons/Log-out.svg'
    }
] 


</script>

<template>
    <div class="page-main">
        <div class="navbar bg-[#1D1B1B]">
            <div class="label-box h-full flex self-center items-center justify-center relative w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#797979]">
                <img class=" h-[80px]" src="../assets/tasker_logo.svg" alt="">
                <h1 class="text-4xl">TASKER</h1>
            </div>
            <SectionComponent class=' self-start place-self-center' v-for="section in sections" :icon_path="section.path" :title="section.title"/>
        </div>
        <div class="">
            <header class=" flex justify-between items-center p-2 bg-[#2C2C2C]">
                <AddButton/>
            </header>
            <div class=" p-3">
                <TaskCard title="task" :state="false", />
            </div>
        </div>


    </div>
    
</template>

<style scoped>
    .page-main{
        display: grid;
        grid-template-columns: 3fr 8fr;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
    }
    .label-box{
        align-items: center;
    }
    .navbar{
        display:grid;
        place-items: center;
        height: 100vh;
        grid-template-columns: 1fr;
        grid-template-rows: 2fr 1fr 1fr 1fr repeat(5, 2fr) 1fr;
        row-gap: 1rem;
    }   
    h1{
        font-family: 'jetbrainsExtraBold';
    }
</style>