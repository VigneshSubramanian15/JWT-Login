const express = require('express')
const app = express()
const mongoos = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//import Routes
const authRoutes = require('./Routes/auth') 
const postRouts = require('./Routes/post')
//connect to db
mongoos.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('connected To BD');
})
// Middleware
app.use(express.json())
//Route Middleware
app.use('/api/users', authRoutes)
app.use(postRouts)


app.listen(3000, () => {console.log('up in running ');})