const app = require('./app.js')

app().catch((err) => {
  console.log(err)
  process.exit(0)
})
