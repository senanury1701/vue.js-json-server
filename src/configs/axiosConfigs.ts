import axios from 'axios'
import router from '@/router'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',

  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// Request interceptor for adding authorization header
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : ''
  }

  return config
})

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      // Logout user and redirect to the login page
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      router.push('/login')
    }
    else {
      return Promise.reject(error)
    }
  },
)

export default axiosInstance
