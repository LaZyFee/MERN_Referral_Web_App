import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://mern-referral-web-app.vercel.app/api/',
})

export default axiosInstance