const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');

router.get('/', auth.isLoggedIn, async(req, res) => {

    if (req.user) {
        console.log('userProfile', req.user);
        let user = await User.findById(req.user._id);

        console.log(user);

        let userObj = user.toObject();
        
        res.status(200).json({userObj});
        return;
    } else {
        res.status(400).json({message : {msgBody : `To access this page you have to logged in.`, msgError: true}});
        return;
    }
});

router.post('/', auth.isLoggedIn, async(req, res) => {
    if(req.user) {
        const existingUser = await User.findById(req.user._id);
        if(existingUser){
            await User.findByIdAndUpdate(req.user._id, {
                quiz: req.body.quizQuestions
            });

            res.status(200).json({message : {msgBody : "The quiz questions were successfully updated.", msgError: false}});
            return;
        } else {
            res.status(400).json({message : {msgBody : "An error has ocurred.", msgError: true}});
        }
    }
})

module.exports = router;