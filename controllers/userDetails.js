'use strict'

const express = require("express")
const router = express.Router()

//Database connection using knex
const knex = require('knex')
const knexFile = require('../knexfile').development

//Encryption
const encryptRoute = require('./encryption')

//Route to get the user list
router.get("/userlist", (req, res, next) => {

    var db = knex(knexFile)

    db('user_table').select('username', 'id')
        .then(data => {

            if (data.length > 0) {
                res.status(200).json({
                    status: "ok",
                    message: "Users list",
                    users: data
                })

            } else {
                db.destroy()
                res.status(200).json({
                    status: "ok",
                    message: "No data found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: "failed",
                message: "Error fetching data"
            })
        })
        .finally(() => db.destroy())

})

module.exports = router