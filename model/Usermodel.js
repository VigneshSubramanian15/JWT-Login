const mongose = require('mongoose')

const userschema = new mongose.Schema({
    name : {
        type:String,
        require: true,
        min: 6
    },
    email : {
        type : String,
        required : true,
    },
    password: {
        type : String,
        required : true,
        min : 6,
        max : 1024
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongose.model('User', userschema)