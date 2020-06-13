var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var mysql = require('mysql');
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Api = require('./routes/Api')

app.use('/api', Api)



app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
