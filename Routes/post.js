const router = require('express').Router()

const verify = require('./verify-token')
router.get('/', verify, (req, res) => {
    var user  = req.user
    res.json({post : {title : 'verifyed'},user})
})

module.exports = router