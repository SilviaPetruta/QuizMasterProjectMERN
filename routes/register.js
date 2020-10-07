const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

router.post('/', async(req, res) => {

    console.log('Inside the register.');
    console.log(req.body);

    User.findOne({ email: req.body.userEmailForm }, async(err, user) => {
        if(err) {
            console.log(`An error has ocurred: ${err}`);

            res.status(500).json({message : {msgBody : "An error has occured", msgError: true}});
        } else if(user) {
            res.status(400).json({message : {msgBody : `An account with the email address ${req.body.userEmailForm} already exists.`, msgError: true}});
        } else if(req.body.userPasswordForm !== req.body.userConfirmPasswordForm) {
            res.status(400).json({message : {msgBody : "The passwords have to be the same. Please try again.", msgError: true}});
        } else {
            console.log(`Passwords match.`);

            const hashedPassword = await bcryptjs.hash(req.body.userPasswordForm, 8);

            const newUser = new User({
                name: req.body.userNameForm,
                email: req.body.userEmailForm,
                password: hashedPassword,
                role: req.body.userRoleForm
            });

            console.log(newUser);

            newUser.save(err => {
                if (err) {
                    console.log(`An error has ocurred: ${err}`);

                    res.status(500).json({message : {msgBody : "The account could not be created. Please try again!", msgError: true}});
                } else {
                    res.status(200).json({message : {msgBody : "Account successfully created", msgError: false}});
                }
            });
        }
    });
        

    // try {

    //     const user = await User.find({ email: req.body.userEmailForm });

    //     console.log(user);

    //     if (user.length > 0) {

    //         let message = `An account with the email address ${req.body.userEmailForm} already exists.`;
    //         res.render('register', {message});

    //     } else if(req.body.userPasswordForm == req.body.userConfirmPasswordForm) {
    //         console.log(`Passwords match.`);
    //         const hashedPassword = await bcryptjs.hash(req.body.userPasswordForm, 8);

    //         await User.create({
    //             name: req.body.userNameForm,
    //             email: req.body.userEmailForm,
    //             password: hashedPassword,
    //             role: req.body.userRoleForm
    //         });

    //         console.log(`Created user with email ${req.body.userEmailForm}.`);

    //         return res.status(200).json('/login');
            
    //     } else {
    //         let message = `The passwords have to be the same. Please try again.`;
    //         let user = {
    //             name: req.body.userNameForm,
    //             email: req.body.userEmailForm,
    //             role: req.body.userRoleForm
    //         }
    //         res.status(200).json({
    //             message: 'The passwords have to be the same. Please try again.`!'
    //         });
    //     }
        
    // } catch (error) {
    //     console.log(`An error ocurred ${error}`);
    //     // 500 - internal server error
    //     res.status(500).json({ error: error.message });
    // }    
});

module.exports = router;