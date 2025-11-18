<script setup lang="ts">
import Directory from "../components/Directory.vue";
import type { User, DirectoryRequests, DirectoryResponse, FileRequest, FileResponse } from "../interfaces/apiInterfaces.ts";
import { get_directories, make_directory, get_files, create_file,
         get_all_users, get_user_dir_files, get_user_dirs,
         delete_user, delete_user_dir, delete_user_file } from "../tools/apiCallFunctions";
import File from "../components/File.vue";
import { onMounted, ref } from "vue";
import AddButton from "../components/AddButton.vue";
import SectionComponent from "../components/SectionComponent.vue";
import { type sectionInterface } from "../interfaces/sectionInterface";
import type { Ref } from "vue";
import { authStore } from "../stores/authStore.ts";
import UserIcon from "../components/UserIcon.vue";

const store = authStore();

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
const users = ref({
    users: [] as Array<User>
});
const directories  = ref({
    directories: [] as Array<DirectoryResponse>
});
const files = ref({
    files: [] as Array<FileResponse>
});
const file_config:Ref<FileRequest> = ref({
    name: ref(''),
    path: localStorage.getItem('previous_path')
});
const admin_directories = ref({
    directories: [] as Array<DirectoryResponse>
});
const admin_files = ref({
    files: [] as Array<FileResponse>
});
const get_files_handler = async (request: FileRequest) => {
    try {
        const response = await get_files(request);
        files.value.files = response.data.files;
    } catch (error) {
        console.log("failed to get files", error);
    }
}
const create_file_handler = async (request: FileRequest) => {
    try {
        const response = await create_file(request);
        files.value.files.push({name: response.data.file.name});
    } catch (error) {
        console.log("failed to create file", error);
    }
}
const directory_config:Ref<DirectoryRequests> = ref({
    name: ref(''),
    path: localStorage.getItem('curr_path')
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
        file_config.value.path = localStorage.getItem('previous_path');
        get_files_handler({name: directory_name, path: file_config.value.path!});
        get_directories_handler({name: directory_name, path: directory_config.value.path!});
    } catch (error) {
        throw error;   
    }
}
const handle_back_click = () => {
    try {
        const prev_path = localStorage.getItem('previous_path');
        localStorage.setItem('curr_path', prev_path!);
        
        const path_parts = prev_path!.split('/').filter(part => part !== '');
        path_parts.pop(); 
        const new_prev_path = '/' + path_parts.join('/') + (path_parts.length > 0 ? '/' : '');
        
        localStorage.setItem('previous_path', new_prev_path);
        
        directory_config.value.path = localStorage.getItem('curr_path');
        file_config.value.path = localStorage.getItem('previous_path');
        
        get_files_handler({name:'root', path:file_config.value.path!});
        get_directories_handler({name:'root', path:directory_config.value.path!});
        
        if(localStorage.getItem('curr_path') === '/'){
            is_root.value = true;
        }
    } catch (error) {
        throw error;
    }
}
const admin_get_users = async () => {
    try {
        const response = await get_all_users(store.user);
        users.value.users = response.data.users;
    } catch (error) {
        console.log("failed to get all users", error);
    }
}
const admin_get_user_dirs = async (user_id: number) => {
    try {
        const response = await get_user_dirs(store.user, user_id);
        users.value.users = [];
        admin_directories.value.directories = response.data.directories;
    } catch (error) {
        console.log("failed to get user directories", error);
    }
}
const admin_get_user_dir_files = async (user_id: number, path: string, name: string) => {
    try {
        const response = await get_user_dir_files(store.user, user_id, path, name);
        users.value.users = [];
        admin_files.value.files = response.data.files;
    } catch (error) {
        console.log("failed to get user directory files", error);
    }
}
onMounted( async () => {
    if (store.user?.is_admin) {
        await admin_get_users();
    } else {
        await get_directories_handler({
            name:'root',
            path:'/'
    });
        await get_files_handler({
            name:'root', path:'/'});
    }
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
                <button v-if="!is_root" @click="handle_back_click">back</button>
                <div class="flex items-center">
                    <span class=" m-1">add directory:</span>
                    <AddButton @click="make_directory_handler(directory_config)"/>
                    <input type="text" v-model="directory_config.name" class=" ml-2 p-1 rounded-md text-white" />
                </div>
                <div class="flex items-center">
                    <span class=" m-1">add file:</span>
                    <AddButton @click="create_file_handler(file_config)"/>
                    <input type="text" v-model="file_config.name" class=" ml-2 p-1 rounded-md text-white" />
                </div>
            </header>
            <div v-if="!store.user?.is_admin" class="desktop p-3">
                <Directory @click="handle_dir_click(directory.name)" v-for="directory in directories.directories" :name="directory.name"/>
                <File v-for="file in files.files" :name="file.name"/>
                
            </div>
            <div v-else class="desktop p-3">
                <UserIcon @click="admin_get_user_dirs(user.id)" v-for="user in users.users" :name="user.name"/>
                <Directory @click="admin_get_user_dir_files(directory.user_id, directory.path, directory.name)" v-for="directory in admin_directories.directories" :name="directory.name"/>
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