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
export const changeStatusArticle = createAsyncThunk(
    "articles/changeStatusArticle",
    async({newStatus, _id}, {dispatch, getState}) => {
        try {
            const request = await axios.patch(`/api/articles/article/${_id}`, {
                status: newStatus
            },  getAuthHeader())

            let article = request.data;
            // previous stat
            let state = getState().articles.adminArticles.docs;
            // finde the position
            let position = state.findIndex( article => article._id === _id)
            //we cant mutate "let state", so we create a copy
            const newState = [...state];
            newState[position] = article;
            dispatch(successGlobal("Status updated!!"))

            return newState
        } catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)
export const removeArticle = createAsyncThunk(
    "articles/removeArticle",
    async(_id, {dispatch, getState}) => {
        try {
            axios.delete(`/api/articles/article/${_id}`, getAuthHeader())
            dispatch(successGlobal("Article removed!!"))
            let page = getState().articles.adminArticles.page
            dispatch(getPaginateArticles({page}))

            return true
            
        } catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)
export const homeLoadMore = createAsyncThunk(
    "articles/homeLoadMore",
    async(sort, {dispatch, getState}) => {
        try {
            const articles = await axios.post(`/api/articles/all`, sort);
            const state = getState().articles.articles;

            const prevState = [...state];
            const newState = [...prevState, ...articles.data];

            return { newState, sort }

        } catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)
export const getArticle = createAsyncThunk(
    "articles/getArticle",
    async(id, {dispatch}) => {
        try {
            const request = await axios.get(`/api/articles/users/article/${id}`)
            
            return request.data
        } catch(err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)


