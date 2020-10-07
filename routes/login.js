const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async(req, res) => {

    User.findOne({ email: req.body.userEmailForm }, async(err,user) => {
        if(err) {
            console.log(`An error has ocurred: ${err}`);

            res.status(500).json({message : {msgBody : "An error has occured", msgError: true}});
        } else if (user) {
            const passwordsMatch = await bcryptjs.compare(req.body.userPasswordForm, user.password);

            if(passwordsMatch) {
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
                    ), 
                    httpOnly: true
                };

                res.cookie('jwt', token, cookieOptions);
                res.status(200).json({isAuthenticated: true,user: {email, password}});
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

    // try {
    //     const user = await User.findOne({ email: req.body.userEmailForm });
    //     console.log(user);
    
    //     if(user) {
    //         const passwordsMatch = await bcryptjs.compare(req.body.userPasswordForm, user.password);
    //         if(passwordsMatch) {
    //             const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
    //                 expiresIn: process.env.JWT_EXPIRES_IN
    //             });

    //             const cookieOptions = {
    //                 expires: new Date(
    //                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
    //                 ), 
    //                 httpOnly: true
    //             };

    //             res.cookie('jwt', token, cookieOptions);

    //             if (user.role == 'admin') {
    //                 res.redirect('profileAdmin');
    //             } else {
    //                 res.redirect('profileUser');
    //             }
    //             return;
    //         } else {
    //             let message = `The password or email is wrong. Please try again.`;
    //             res.render('login', {message});
    //             return;
    //         }
    //     }  else {
    //         let message = `The password or email is wrong. Please try again.`;
    //         res.render('login', {message});
    //     }
    // } catch (error) {
    //     let message = `There was an issue processing your request. Please try again.`;
    //     res.render('login', {message});
    // }
});

module.exports = router;