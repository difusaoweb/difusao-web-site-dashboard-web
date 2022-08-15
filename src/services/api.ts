import axios from 'axios'

const baseURL = `${import.meta.env.VITE_API_URL}:${
  import.meta.env.VITE_API_PORT
}/v${import.meta.env.VITE_API_VERSION}/`

export const api = axios.create({
  baseURL,
  headers: { 'Access-Control-Allow-Origin': '*' }
})
