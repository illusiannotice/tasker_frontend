import { api } from "./api";
import type { DirectoryRequests, DirectoryResponse } from "@/interfaces/apiInterfaces";

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
        const response = await api.post<DirectoryResponse>('add_directory', request_body);
        return response;
    } catch (error) {
        console.error('Failed to add directory:', error);
        throw error;
    }

};

