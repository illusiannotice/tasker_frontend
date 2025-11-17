export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
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
    path: string;
}
export interface DirectoryResponse{
    id: number;
    name: string;
    path: string;
}
export interface FileRequest{


}