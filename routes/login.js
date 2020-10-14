const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async(req, res) => {

    User.findOne({ email: req.body.userEmailForm }, async(err,existingUser) => {
        // console.log('Backend login', req.body.userEmailForm);
        if(err) {
            // console.log(`An error has ocurred: ${err}`);

            res.status(500).json({message : {msgBody : "An error has occured", msgError: true}});
        } else if (existingUser) {
            const passwordsMatch = await bcryptjs.compare(req.body.userPasswordForm, existingUser.password);
            // console.log(passwordsMatch);
            // console.log('IDDDDDD: ',existingUser._id);

            if(passwordsMatch) {
                const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                // console.log(token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
                    ), 
                    httpOnly: true
                };

                // console.log(cookieOptions);

                const user = {
                    name: existingUser.name,
                    role: existingUser.role,
                    email: existingUser.email
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).json({isAuthenticated: true, user, message : {msgBody : "User logged in successfully.", msgError: false}});

                return;
                
            } else {
                res.status(400).json({message : {msgBody : `The password or email is wrong. Please try again.`, msgError: true}});
                return;
            }
        } else {
            res.status(400).json({message : {msgBody : `The password or email is wrong. Please try again.`, msgError: true}});
            return;
        }
    });
});

module.exports = router;