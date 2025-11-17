<script setup lang="ts">
import Directory from "../components/Directory.vue";
import type { DirectoryRequests, DirectoryResponse } from "../interfaces/apiInterfaces.ts";
import { get_directories, make_directory } from "../tools/apiCallFunctions";
import { onMounted, ref, toRaw } from "vue";
import AddButton from "../components/AddButton.vue";
import SectionComponent from "../components/SectionComponent.vue";
import { type sectionInterface } from "../interfaces/sectionInterface";
import type { Ref } from "vue";
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
const is_root = ref(true);
localStorage.setItem('curr_path', '/');
localStorage.setItem('previous_path', '/');
const directories  = ref({
    directories: [] as Array<DirectoryResponse>
});
const directory_config:Ref<DirectoryRequests> = ref({
    name: ref(''),
    path: localStorage.getItem('curr_path'),
});
const make_directory_handler = async (request: DirectoryRequests) => {
    try {
        const response = await make_directory(request);
        directories.value.directories.push(response.data.directory);
    } catch (error) {
        console.log("failed to make directory", error);
    }
}
const get_directories_handler = async (request: DirectoryRequests) => {
    try {
        const response = await get_directories(request);
        directories.value.directories = response.data.directories;
    } catch (error) {
        console.log("failed to get directories", error);
    }
}
const handle_dir_click = (directory_name: string) => {
    try {
        is_root.value = false;  
        localStorage.setItem('previous_path', localStorage.getItem('curr_path')!);
        localStorage.setItem('curr_path', localStorage.getItem('curr_path') + directory_name + '/');
        console.log(localStorage.getItem('curr_path'));
        directory_config.value.path = localStorage.getItem('curr_path');
        get_directories_handler({name: directory_name, path: directory_config.value.path!});
    } catch (error) {
        throw error;   
    }
}
onMounted( async () => {

    await get_directories_handler({
        name:'root',
        path:'/'
    });
});


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
                <button v-if="!is_root">back</button>
                <div class="flex items-center">
                    <span class=" m-1">add directory:</span>
                    <AddButton @click="make_directory_handler(directory_config)"/>
                    <input type="text" v-model="directory_config.name" class=" ml-2 p-1 rounded-md text-white" />
                </div>
                <div class="flex items-center">
                    <span class=" m-1">add file:</span>
                    <AddButton/>
                </div>
            </header>
            <div class="desktop p-3">
                <Directory @click="handle_dir_click(directory.name)" v-for="directory in directories.directories" :name="directory.name"/>
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
    .desktop{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem;
        place-items: center;
    }
</style>