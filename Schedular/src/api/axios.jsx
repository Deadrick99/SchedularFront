import axios from "axios"

const BASE_URL = "https://schedularback-production.up.railway.app"

export default axios.create({
    baseURL:BASE_URL
});

export const axiosPrivate = axios.create({
    baseURl:BASE_URL,
    headers:{"Content-Type":"application/json"},
    withCredentails:true,
})