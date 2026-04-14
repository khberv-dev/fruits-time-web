import axios from "axios";
import {baseApiUrl} from "@/services/config.js";

const refreshTokensPath = 'auth/refresh'

export const api = axios.create({
    baseURL: baseApiUrl
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token')

        if (accessToken && config.url !== refreshTokensPath) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)