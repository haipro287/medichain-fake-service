const { json } = require('express');
const { PORT, API_PREFIX } = require('./config/vars.js')
const morgan = require('morgan');
const app = require('express')();
const cors = require('cors');

const server = require('http').createServer(app)

app.use(json())
app.use(cors())
app.use(morgan("dev"))
app.use(API_PREFIX, require('./api'))

module.exports = async () => {
  server.listen(PORT, () => {
    console.info(
      '\x1b[36m',
      `======= Starting server at http://localhost:${PORT} =======`,
    )
  })
}
