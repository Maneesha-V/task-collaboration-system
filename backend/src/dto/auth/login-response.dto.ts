export interface LoginData  {
  email:string;
  password:string;
}
export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}