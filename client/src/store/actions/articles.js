import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { errorGlobal, successGlobal } from "../reducers/notifications"
import { getAuthHeader } from "../../utils/tools"

axios.defaults.headers.post["Content-Type"] = "aplication/json";

///api/articles/

export const addArticle = createAsyncThunk (
    "articles/addArticle",
    async(article, {dispatch}) => {
        try{
            const request = await axios.post("/api/articles/", article, getAuthHeader())
            dispatch(successGlobal("Post created!!"))
            return request.data
        }catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)
export const getAdminArticle = createAsyncThunk (
    "articles/getAdminArticle",
    async(_id, {dispatch}) => {
        try{
            const request = await axios.get(`/api/articles/article/${_id}`, getAuthHeader())
            return request.data
        }catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)
export const updateArticle = createAsyncThunk(
    "articles/updateArticle",
    async({values, articleId}, {dispatch}) => {
        try {
            await axios.patch(`/api/articles/article/${articleId}`, values,  getAuthHeader())
            dispatch(successGlobal("Article updated!!"))
            return true
        } catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)
export const getPaginateArticles = createAsyncThunk(
    "articles/getPaginateArticles",
    async({page=1, limit=5, keywords=""}, {dispatch}) => {
        try {
            const request = await axios.post("/api/articles/admin/paginate", {
                page,
                limit,
                keywords
            }, getAuthHeader())
            return request.data
        } catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)


