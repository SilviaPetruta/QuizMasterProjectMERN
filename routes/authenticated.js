const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth.isLoggedIn, (req,res)=>{
    console.log("GET Authenticated called!");
    console.log(req.user);
    if (req.user) {
        const {email, role, name} = req.user;
        res.status(200).json({isAuthenticated: true, user: {email, role, name}});
    } else {
        res.status(401).json({isAuthenticated: false, user: null});
    }
});

module.exports = router;