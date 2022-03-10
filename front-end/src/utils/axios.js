import axios from "axios"

import { ACCESS_TOKEN } from "../constants/constants";
import { API_URL } from "../constants/urls";


const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Authorization': ACCESS_TOKEN
            ? 'Bearer ' + ACCESS_TOKEN
            : '',
        "Content-Type": 'application/json',
        accept: 'application/json',
    },
})

export default axiosInstance