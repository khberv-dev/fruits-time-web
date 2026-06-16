import {api} from "@/services/api.js"

export const askAdvisor = (text) => api.post('/advisor/ask', {text}).then(r => r.data)
export const getAdvisorHistory = () => api.get('/advisor/history').then(r => r.data)
