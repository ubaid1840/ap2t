// lib/axios.js
import original_axios from 'axios'
import { BASE_URL } from '@/lib/constants'
import { toast } from 'sonner'


const axios = original_axios.create({

  baseURL: BASE_URL
})

axios.interceptors.request.use(config => {

  config.baseURL =  BASE_URL
    

  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  config.headers['Pragma'] = 'no-cache';
  config.headers['Expires'] = '0';

  return config;
})

axios.interceptors.response.use(
  response => response,
  error => {
    const message =
      error?.response?.data?.message || error?.message || "Something went wrong"
    toast.error(message)

    return Promise.reject(error)
  }
)

export default axios
