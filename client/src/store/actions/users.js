import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { errorGlobal, successGlobal } from "../reducers/notifications"
import { getAuthHeader, removeTokenCookie } from "../../utils/tools"

export const registerUser = createAsyncThunk(
    "users/registerUser",
    async({email, password}, {dispatch}) => {
        try {
            const request = await axios.post("/api/auth/register",{
                email: email,
                password: password
            });
            dispatch(successGlobal("Welcome!! Check your email to validate your account"))
            return { data: request.data.user, auth: true}
        } catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err;
        }
    }
    )

export const signInUser = createAsyncThunk(
        "users/signInUser",
        async({email, password}, {dispatch}) => {
            try {
                const request = await axios.post("/api/auth/signin",{
                    email: email,
                    password: password
                })
                dispatch(successGlobal("Welcome!!"))
                return { data: request.data.user, auth: true}
            } catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err;
        }
    }
)

export const isAuth = createAsyncThunk(
    "users/isAuth",
    async() =>{
        try{
            const request = await axios.get("/api/auth/isauth", getAuthHeader())
            return {data: request.data, auth: true}
        }catch(err){
            return {data: {}, auth: false}
        }
    }
)
export const signOut = createAsyncThunk(
    "users/signOut",
    async() =>{
        removeTokenCookie();
    }
)
export const updateUserProfile = createAsyncThunk(
    "users/updateUserProfile",
    async(data, {dispatch}) =>{
        try{
            const profile = await axios.patch("/api/users/profile", data, getAuthHeader())
            dispatch(successGlobal("Profile Updated!!"))
            return {
                firstname: profile.data.firstname,
                lastname: profile.data.lastname,
                age: profile.data.age
            }
        } catch (err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)
export const changeEmail = createAsyncThunk(
    "users/changeEmail",
    async(data, {dispatch}) =>{
        try{
            const request = await axios.patch("/api/users/email", {
                email: data.email,
                newemail: data.newemail
            }, getAuthHeader())

            dispatch(successGlobal("Email Updated!!"))
            return {
                email: request.data.user.email,
                verified: false
            }
            
        } catch (err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)

