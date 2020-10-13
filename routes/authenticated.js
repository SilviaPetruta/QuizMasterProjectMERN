const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/authenticated', auth.isLoggedIn, (req,res)=>{
    console.log("connected!");
    const {email, role, name} = req.user;
    res.status(200).json({isAuthenticated: true, user: {email, role, name}});
});

module.exports = router;