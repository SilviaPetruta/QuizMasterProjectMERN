const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth.logout, (req, res) => {
    res.status(200).json(
        {
            message: {
                msgBody: "Account successfully logged out.", 
                msgError: false
            }, 
            user: {
                email: "", 
                name: "", 
                role: ""
            }, 
            success: true
        }
    );
});

module.exports = router;