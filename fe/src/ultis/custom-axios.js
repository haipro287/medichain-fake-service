import axios from "axios";

const {REACT_APP_API_URL} = process.env;

export default function createAxios() {
    let _axios = axios.create()
    _axios.defaults.baseURL = REACT_APP_API_URL;
    _axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    }, error => Promise.reject(error))
    return _axios;
}
