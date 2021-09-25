const globby = require('globby')
const path = require('path')

const api = require('express').Router()

api.get('/', (req, res) => {
  res.json({
    msg: `Welcome to Fake World`,
  })
})

const apis = globby.sync('**/*.controller.js', {cwd: './src/api'});
apis.map((i) => require(path.resolve(`./src/api/${i}`))).forEach((subApi) => {api.use(subApi)});
module.exports = api;
