import { api } from "./api";
import type { DirectoryRequests, FileRequest, User, AdminRequest } from "@/interfaces/apiInterfaces";


export const get_directories = async (request_body: DirectoryRequests) => {
    try {
        const response = await api.post('get_directories', request_body);
        return response;    
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
    

};

export const make_directory = async (request_body: DirectoryRequests) => {
    try {
        const response = await api.post('add_directory', request_body);
        return response;
    } catch (error) {
        console.error('Failed to add directory:', error);
        throw error;
    }

};


export const get_files = async (request: FileRequest) => {
    try {
        const response = await api.post('get_files', request);
        return response;
    } catch (error) {
        console.error('Failed to fetch files:', error);
        throw error;
    }
};

export const create_file = async (request: FileRequest) => {
    try {
        const response = await api.post('create_file', request);
        return response;
    } catch (error) {
        console.error('Failed to create file:', error);
        throw error;
    }
};
export const get_all_users = async (user: User | null) => {
    if (user !== null && !user.is_admin) {
        throw new Error('Unauthorized: Admin access required');
    }
    try {
        const response = await api.get('admin/get_users');
        return response;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
};
export const delete_user = async (user: User | null, request: AdminRequest) => {
    
    if (user !== null && !user.is_admin) {
        throw new Error('Unauthorized: Admin access required');
    }
    try {
        const response = await api.post('admin/delete_user', request);
        return response;
    } catch (error) {
        console.error('Failed to delete user:', error);
        throw error;
    }
};
export const get_user_dirs = async (user: User | null, user_id: number) => {
    if (user !== null && !user.is_admin) {
        throw new Error('Unauthorized: Admin access required');
    }
    try {
        const response = await api.get(`admin/get_directories/${user_id}`);
        return response;
    }   catch (error) { 
        console.error('Failed to fetch user directories:', error);
        throw error;
    }   
    
};
export const get_user_dir_files = async (user: User | null, user_id: number, path: string, name: string) => {
    
    if (user !== null && !user.is_admin) {
        throw new Error('Unauthorized: Admin access required');
    }
    try {
        const response = await api.get(`admin/get_files/${path}/${name}/${user_id}`);
        return response;
    }   catch (error) { 
        console.error('Failed to fetch user files:', error);
        throw error;
    }
};

export const delete_user_dir = async (user: User | null, request: AdminRequest) => {
    if (user !== null && !user.is_admin) {
        throw new Error('Unauthorized: Admin access required');
    }
    try {
        const response = await api.post('admin/delete_directory', request);
        return response;
    } catch (error) {
        console.error('Failed to delete user directory:', error);
        throw error;
    }
};

export const delete_user_file = async (user: User | null, request: AdminRequest) => {
    if (user !== null && !user.is_admin) {
        throw new Error('Unauthorized: Admin access required');
    }
    try {
        const response = await api.post('admin/delete_file', request);
        return response;
    } catch (error) {
        console.error('Failed to delete user file:', error);
        throw error;
    }
};