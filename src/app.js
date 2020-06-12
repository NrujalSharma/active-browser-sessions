const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
require('./socket.js').myFunc(io)

const port = process.env.PORT || 3000

app.get('/socket-test', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/socket-test.html'))
})
app.get('/socket-test2', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/socket-test2.html'))
})

server.listen(port, () => {
  console.log('Example app listening on port 3000!')
  console.log('sAvailable Routes')
  console.log('/socket-test - Shows unique browser sessions active')
  console.log('/socket-test2 - Shows total active sessions')
})
