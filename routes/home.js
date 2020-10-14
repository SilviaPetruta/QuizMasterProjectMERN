const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth.isLoggedIn, async(req, res) => {
    return res.status(200);
});

module.exports = router;