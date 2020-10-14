const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/user');
const Quiz = require('../models/quiz');

router.get('/', auth.isLoggedIn, async(req, res) => {
    if(req.user) {
        let allUsers = await User.find().populate('quiz');
        
        console.log('All users from backend: ', allUsers);

        for(let test in allUsers) {
            console.log("User ", test, ":", allUsers[test].quiz);
        }

        // console.log('All users from backend (populated): ', allUsers);

        let allUsersArray = allUsers.map(item => item.toObject());

        res.status(200).json(
            {
                message: {
                    msgBody: "All users have been found.", 
                    msgError: false
                }, 
                allUsersArray, 
                success: true
            }
        )
    }
});

module.exports = router;