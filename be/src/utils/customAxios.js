const axios = require('axios')

const {GATEWAY_URL} = require('../config/vars');

const createAxios = () => {
    let _axios = axios.create()
    _axios.defaults.baseURL = GATEWAY_URL;
    return _axios;
}

module.exports = (
    createAxios
)
