require('dotenv').config()

const ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const API_PREFIX = process.env.API_PREFIX ?? '/api'
const TOKEN_SECRET = process.env.TOKEN_SECRET
const SERVICE_CODE = process.env.SERVICE_CODE
const GATEWAY_URL = process.env.GATEWAY_URL

module.exports = {
    ENV,
    PORT,
    API_PREFIX,
    TOKEN_SECRET,
    SERVICE_CODE,
    GATEWAY_URL,
}
