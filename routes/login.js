const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', (req,res) => {
    res.render('login');
    return;
});

router.post('/', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.userEmailForm });
        console.log(user);
    
        if(user) {
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

                if (user.role == 'admin') {
                    res.redirect('profileAdmin');
                } else {
                    res.redirect('profileUser');
                }
                return;
            } else {
                let message = `The password or email is wrong. Please try again.`;
                res.render('login', {message});
                return;
            }
        }  else {
            let message = `The password or email is wrong. Please try again.`;
            res.render('login', {message});
        }
    } catch (error) {
        let message = `There was an issue processing your request. Please try again.`;
        res.render('login', {message});
    }
});

module.exports = router;