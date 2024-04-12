import axios from 'axios'

const api = axios.create({
  baseURL: '',
  // baseURL: 'http://192.168.1.12:8000',
  // baseURL: 'http://10.0.2.2:8000',
  // baseURL: 'http://localhost:8000',
})

export default api
