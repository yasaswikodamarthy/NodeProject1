'use strict'

const jwt = require('jsonwebtoken')
const secret_key = require('../config')

const auth = function(req, res, next) {
        if (typeof req.headers.authorization !== "undefined") {
            var token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, secret_key, (err, user) => {
                if (err) {
                    res.status(401).json({
                        status: "failed",
                        message: "Not Authorized"
                    })
                }
                next()
            })
        } else {
            res.status(500).json({
                status: "failed",
                message: "Not Authorized"
            })
        }
    }
    
module.exports = auth