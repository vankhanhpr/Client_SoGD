'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API: '"http://localhost:58789"'
   API: '"https://apitphcm.hcmtelecom.vn"'
})
