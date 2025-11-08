import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import {api} from '../tools/api.ts';
import type { User, LoginCredentials, RegisterLoginResponse, RegisterCredentials} from '../interfaces/apiInterfaces.ts';


export const authStore = defineStore('auth',() => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('auth_token'));
    const loading = ref<boolean>(false);

    const isAuthenticated = computed<boolean>(() => !!token.value);
    const userName = computed<string>(() => user.value?.name || '');
    
    const login = async (credentials: LoginCredentials) => {
        loading.value = true;
        
        try{
            const response = await api.post<RegisterLoginResponse>('/login', credentials);

            token.value = response.data.token;
            user.value = response.data.user;
            localStorage.setItem('auth_token', response.data.token);

            if (api.defaults.headers.common) {
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }
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
        
        try{
            const response = await api.post<RegisterLoginResponse>('/register', credentials);

            token.value = response.data.token;
            user.value = response.data.user;
            localStorage.setItem('auth_token', response.data.token);
            if (api.defaults.headers.common) {
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }
            return response.data;

        }catch(err: any){
            const error = err.response?.data?.error || "Registration Failed";
            throw new Error(error);
        }finally{
            loading.value = false;
        }
    };

    const checkAuth = async () => {
        if(!token.value){
            return false;
        }

        try{
            
            if (api.defaults.headers.common) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
            }

            const response = await api.get<User>('/getUser');

            user.value = response.data;
            return true;


        }catch(err){

            localStorage.removeItem('auth_token');
            
            token.value = null;
            user.value = null;

            if (api.defaults.headers.common) {
                delete api.defaults.headers.common['Authorization'];
            }

            return false;

        }

    };
    const logout = async () => {

        try {
            
            await api.post('/logout');
            
        } catch (error: any) {

            console.error('Logout error:', error);
        
        } finally {
            token.value = null;
            user.value = null;
            localStorage.removeItem('auth_token');
      
            if (api.defaults.headers.common) {
                delete api.defaults.headers.common['Authorization'];
            }
        }
    }
});


