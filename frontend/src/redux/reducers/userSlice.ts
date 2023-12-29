import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { Axios, AxiosError } from "axios";
import {jwtDecode, JwtPayload } from "jwt-decode"
import { IAuthentication, IToken, JWT } from "../../types/interface/auth";
import { IUser } from "../../types/interface/user";








  
  
  

  
const initialState: IAuthentication = {
    isLogin:false,
    user:null,
    token:{
        refreshToken:localStorage.getItem("refreshToken") ?? null,
        accessToken:null 
    },
    status: null,
    error:null
    
  }



export const fetchAuth = createAsyncThunk<IAuthentication, IAuthPayload, {} >(
    'auth/fetchAuth',
    async function(body, {rejectWithValue}) {
        
        
        const fetchToken = await axios.post<IToken>(
            `${import.meta.env.VITE_API}/auth`, 
            body)

        if(fetchToken.statusText !== "OK"){
            
        }

        localStorage.clear()
        const token = fetchToken.data
        let id = null
        if(token.accessToken !== null && token.refreshToken !==null){
            const {user_id}:JWT = jwtDecode(token.accessToken)
            id=user_id
        }
        
        
        
        localStorage.setItem("refreshToken",token.refreshToken || "")
        const fetchPerson = await axios.get<IUser>(`${import.meta.env.VITE_API}/users/${id}`, 
            { 
                headers:{'Authorization': `Bearer ${token.accessToken}`}
            }
        )


        const person = fetchPerson.data
        
        const user:IAuthentication ={
            isLogin:true,
            token:token,
            user:person,
            error:null,
            status:null
                
            
        }
        
        return user
    }
)


export const fetchRefreshAuth = createAsyncThunk<IAuthentication, string, {} >(
    'auth/fetchRefreshAuth',
    async function(refreshToken, {rejectWithValue}) {
        try {
            const fetchAccessToken = await axios.post<string>(
                `${import.meta.env.VITE_API}/auth/refresh`, 
                {
                    refresh_token:refreshToken
                }).then((response) => response.data)
                .catch((error: AxiosError | Error) => {
                   
                   // Handle other unexpected errors
                   throw error;
                });
                    
                
                
            
    
            localStorage.clear()
            const token:IToken={ 
                refreshToken:refreshToken,
                accessToken:fetchAccessToken
            }
            
            let id = null
            if(token.accessToken !== null && token.refreshToken !==null){
                const {user_id}:JWT = jwtDecode(token.accessToken)
                id=user_id
            }
            
            
            
            localStorage.setItem("refreshToken",token.refreshToken || "")
            
            const fetchPerson = await axios.get<IUser>(`${import.meta.env.VITE_API}/users/${id}`, 
                { 
                    headers:{'Authorization': `Bearer ${token.accessToken}`}
                }
            )
            if(fetchPerson.statusText !== "OK"){
                rejectWithValue("server error")
            }
            
            const person = fetchPerson.data
            
            const user:IAuthentication ={
                isLogin:true,
                token:token,
                user:person,
                error:null,
                status:null
                    
                
            }
            
            return user
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message)
                // Do something with this error...
              } else {
                return rejectWithValue(error)
              }
        }
        
    }
)

export const fetchLogout = createAsyncThunk<IAuthentication, undefined, {} >(
    'auth/fetchLogout',
    async function(_, {rejectWithValue}) {
        try {
            let refreshToken = localStorage.getItem("refreshToken");
            const fetchLogout = await axios.delete<any>(
                `${import.meta.env.VITE_API}/auth/logout`, 
                {
                    data:{refresh_token:refreshToken}    
                    
                }).then((response) => response.data)
                .catch((error: AxiosError | Error) => {
                   
                   // Handle other unexpected errors
                   throw error;
                });

            const token:IToken={ 
                refreshToken:null,
                accessToken:null
            }  
            
            
            
            const user:IAuthentication ={
                isLogin:false,
                token:token,
                user:null,
                error:null,
                status:null
            }
            localStorage.clear()
            return user
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.message)
                // Do something with this error...
              } else {
                return rejectWithValue(error)
              }
        }
        
    }
)


const authReducer = createSlice(
    {
        name:"auth",
        initialState,
        reducers:{},
        extraReducers:(builder)=> {
            builder.addCase(fetchAuth.fulfilled,(state,action) =>{
                state.token = action.payload.token
                state.isLogin=true,
                state.user = action.payload.user
                
            }),
            builder.addCase(fetchRefreshAuth.fulfilled,(state,action) =>{
                state.token = action.payload.token
                state.isLogin=true,
                state.user = action.payload.user
                state.status = "success"
            }),
            builder.addCase(fetchRefreshAuth.pending,(state,action) =>{
                
                state.isLogin=false,
                state.status = "loading"
                
            }),
            builder.addCase(fetchLogout.fulfilled,(state, action)=>{
                
                state.isLogin = action.payload.isLogin
                
                state.status = null
                state.token = action.payload.token
                state.user = action.payload.user
                
            }),
            builder.addMatcher(isError, (state, action:PayloadAction<string>)=>{
                state.error=action.payload
            })
            


        }
    }
)


export const {}= authReducer.actions

export default authReducer.reducer

function isError(action: AnyAction)
{return action.type.endsWith("rejected")}





export interface IAuthPayload {
  login: string;
  password: string;
}


