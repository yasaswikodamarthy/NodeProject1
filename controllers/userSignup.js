'use strict'

const express = require("express")
const router = express.Router()

//Database connection using knex
const knex = require('knex')
const knexFile = require('../knexfile').development

//Encryption
const encryptRoute = require('./encryption')

//jwt
var jwt = require('jsonwebtoken')
var secret_key = require('../config')

//Route for user registration
router.post("/signup", (req, res, next) => {

    var db = knex(knexFile)

    db('user_table').select().where({ 'username': req.body.username })
        .then(data => {

            if (data.length <= 0) {

                var encrypt_password = encryptRoute.encrypt(req.body.password)

                db('user_table')
                    .insert([{
                        username: req.body.username,
                        password: encrypt_password
                    }])
                    .then(insertedId => {
                        var token = jwt.sign({ username: req.body.username }, secret_key, {
                            expiresIn: 86400 // expires in 24 hours
                        })
                        res.status(200).json({
                            status: "ok",
                            message: "logged in successfully",
                            username: req.body.username,
                            token: token
                        })
                    })
                    .finally(() => db.destroy())

            } else {
                db.destroy()
                res.status(409).json({
                    status: "failed",
                    message: "User already exists"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })

})


//Route for user login
router.post("/login", (req, res, next) => {

    var db = knex(knexFile)
    var encrypt_password = encryptRoute.encrypt(req.body.password)

    db('user_table').select().where({ 'username': req.body.username, 'password': encrypt_password })
        .then(data => {

            if (data.length > 0) {
                var token = jwt.sign({ username: req.body.username }, secret_key, {
                    expiresIn: 86400 // expires in 24 hours
                })
                res.status(200).json({
                    status: "ok",
                    message: "logged in successfully",
                    username: req.body.username,
                    token: token
                })

            } else {
                db.destroy()
                res.status(500).json({
                    status: "failed",
                    message: "Please provide correct username and password"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => db.destroy())

})

module.exports = router