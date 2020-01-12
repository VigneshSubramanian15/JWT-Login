const router = require('express').Router()
const User = require('../model/Usermodel')
const { userValidation, loginValidation } = require('../validation')
const Jwt = require('jsonwebtoken')

// Post Register
router.post('/register', async (req, res) => {

    // DATA VALIDATION
    try {
        //validation process
        try {
            await userValidation.validateAsync(req.body)
        } catch (e) { res.status(400).send(e.details[0].message); }


        //Check if user exist
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email exist')

        //New object Creation
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.pass,
        });
        try {
            //Inserting user
            const saveuser = await user.save();
            res.send({ user: user._id })
        } catch (err) {
            res.status(400).send(err)
        }
    }
    catch (err) { res.status(500).send(err) }
});

//Login

router.post('/login', async (req, res) => {
    try {
        //validation process
        try {
            await loginValidation.validateAsync(req.body)
        } catch (e) { res.status(400).send(e.details[0].message); }

        //Check If User Exist
        const user = await User.findOne({ email: req.body.email })
        if (!user) { return res.status(400).send('Email Dose\'t exist') } 
        //Is Password Correct
        if (user.password !== req.body.pass) { res.status(400).send(`Password Incorrect ${user.password} body ${req.body.pass}`) }
        
        //JWT Tokens with 60 min experiy time
        const token = Jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60), 
            data : {_id : user._id, _name : user.email
            }},process.env.TOKEN_SALT);

        res.header('auth-token' , token).send(token)

        // res.status(200).send(`Logged in ${user.name}`)
        
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = router