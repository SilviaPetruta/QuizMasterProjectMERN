const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth.isLoggedIn, async(req, res) => {
    let userInfo = {
        isLoggedIn: false,
        isAdmin: false,
        name: null
    };
    if(req.user) {
        userInfo.isLoggedIn = true;
        userInfo.name = req.user.name;
        if (req.user.role == 'admin') {
            userInfo.isAdmin = true;
        }
    }
    res.render('home', {userInfo});
    return;
});

module.exports = router;