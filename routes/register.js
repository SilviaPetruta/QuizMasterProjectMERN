const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('register');
    return;
});

router.post('/', async(req, res) => {

    try {
        console.log('Inside the register.');
        console.log(req.body);

        const user = await User.find({ email: req.body.userEmailForm });
        console.log(user);

        if (user.length > 0) {

            let message = `An account with the email address ${req.body.userEmailForm} already exists.`;
            res.render('register', {message});

        } else if(req.body.userPasswordForm == req.body.userConfirmPasswordForm) {
            console.log(`Passwords match.`);
            const hashedPassword = await bcryptjs.hash(req.body.userPasswordForm, 8);

            await User.create({
                name: req.body.userNameForm,
                email: req.body.userEmailForm,
                password: hashedPassword,
                role: req.body.userRoleForm
            });

            return res.redirect('login');
            
        } else {
            let message = `The passwords have to be the same. Please try again.`;
            let user = {
                name: req.body.userNameForm,
                email: req.body.userEmailForm,
                role: req.body.userRoleForm
            }
            res.status(200).json({
                message: 'User Registered!'
            });
        }
        
    } catch (error) {
        // 500 - internal server error
        res.status(500).json({ error: error.message });
    }    
});

module.exports = router;