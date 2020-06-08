'use strict'

const express = require('express')
var app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require("morgan");

//Route modules
const userAuthRoute = require('./controllers/userSignup')
const userRoute = require('./controllers/userDetails')
const auth = require('./middleware/auth')

//Joi validation
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const querySchema = Joi.object().keys({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(5).required()
})

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Routes
app.use('/user',auth,userRoute)
app.use('/auth',validator.body(querySchema),userAuthRoute)

//Error handling
app.use(function(err, req, res, next){
  if (err.error.isJoi) {
    res.status(400).json({
      status: 'failed', 
      message: err.error.toString()
    })
  } else {
    res.status(500).json({
      status: 'failed', 
      message: err.error.toString()
    })
    
  }
})

app.use(function(req,res){
    res.status(404).send('Api not found');
});

module.exports = app