const { promisify } = require('util');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

exports.isLoggedIn = async(req, res, next) => {
    console.log("Is logged in called");
    if(req.cookies.jwt) {
        console.log("JWT exists");
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded.id);
    }
    next();
};

exports.logout = async(req, res, next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date( Date.now() + 500 ),
        httpOnly: true
    });

    next();
};
