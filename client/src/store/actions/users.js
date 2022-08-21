import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { errorGlobal, successGlobal } from "../reducers/notifications"

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