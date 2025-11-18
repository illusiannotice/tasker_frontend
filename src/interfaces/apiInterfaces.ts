export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  is_admin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterLoginResponse {
  user: User;
  msg: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

export interface RegisterCredentials{
    name: string;
    email: string;
    password: string;
    password_repetition: string;
}




export interface DirectoryRequests{
    name: string;
    path: string | null;
}
export interface DirectoryResponse{
    name: string;
    path: string;
    user_id: number;
}
export interface FileRequest{
    name: string;
    path: string | null;
}

export interface FileResponse{
    name: string;
    
}

export interface AdminRequest{
    user_id: number;
    path: string | null;
    dir_name: string | null;
    name: string | null;
}