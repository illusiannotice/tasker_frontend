import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import {api} from '../tools/api.ts';
import type { User, LoginCredentials, RegisterLoginResponse, RegisterCredentials} from '../interfaces/apiInterfaces.ts';


export const authStore = defineStore('auth',() => {
    const user = ref<User | null>(null);
    const loading = ref<boolean>(false);

    const isAuthenticated = computed<boolean>(() => !!user.value);
    
    const login = async (credentials: LoginCredentials) => {
        loading.value = true;
        
        try{
            const response = await api.post<RegisterLoginResponse>('/login', credentials,{
                withCredentials: true
            });

            user.value = response.data.user;
            localStorage.setItem('curr_path', '/');
            return response.data;


        }catch(err: any){
            const error = err.response?.data?.error || "Login Failed";
            throw new Error(error);
        }finally{
            loading.value = false;
        }
    };
    const register = async (credentials: RegisterCredentials) => {
        loading.value = true;
        const response = await api.post<RegisterLoginResponse>('/register', credentials, {
                withCredentials: true
            });
        try{
            

            user.value = response.data.user;
            return response.data;

        }catch(err: any){
            console.log(response)
            const error = err.response?.data?.error || "Registration Failed";
            throw new Error(error);
        }finally{
            loading.value = false;
        }
    };


    const logout = async () => {

        try {
            
            await api.post('/logout');
            
        } catch (error: any) {

            console.error('Logout error:', error);
        
        } finally {
            user.value = null;
      
        }
    }
    
    const fetchUser = async () => {
        
    try {
        const response = await api.get('get_user');
        user.value = response.data.user;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;

    
    } catch (error) {
        user.value=null
        localStorage.removeItem('user');
        throw error;
    }


    };
    return {  
        
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        fetchUser
    
    };
});


