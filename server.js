'use strict'

var express = require('express')
var app = express()
var morgan = require('morgan')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// Requiring config files from app directory
var config = require('./app/config')

// Connect to database
mongoose.connect(config.DB)

// Sends static files from public directory
app.use(express.static(path.join(__dirname, '/public')))

// Using morgan to log request in dev mode
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var PORT = config.APP_PORT || 4000

// Importing todo routes, use them with prefix /api
var todoRoutes = require('./app/routes')
app.use('/api', todoRoutes)

app.use(function (req, res, next) {
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)

    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Pass to next layer of middleware
  next()
})
// Server index.html page when request to the root is made
app.get('/', function (req, res, next) {
  res.sendfile('./public/index.html')
})
