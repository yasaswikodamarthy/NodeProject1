'use strict'

const http = require('http')
const app = require('./app')

var port = process.env.PORT || 8080

var server = http.createServer(app)

server.listen(port)

console.log("listening to port 8080!!")