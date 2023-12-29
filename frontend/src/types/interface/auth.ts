import { JwtPayload } from "jwt-decode";
import { IUser } from "./user";

export interface IAuthentication {
    isLogin: boolean;
    user:IUser|null
    token:IToken|null
    status: string|null,
    error:string|null
  }

export interface IToken {
    refreshToken:string|null,
    accessToken:string|null
    
  }

  export interface JWT extends JwtPayload{
    user_id:number,
    login:string
}

