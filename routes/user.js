const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/authenticated', auth.isLoggedIn,(req,res)=>{
    console.log("connected!");
    const {name, email, role} = req.user;
    res.status(200).json({isAuthenticated: true, user: {name, email, role}});
});

module.exports = router;