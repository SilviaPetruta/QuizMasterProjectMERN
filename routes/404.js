const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    console.log("Error called!");
    res.status(404).json({message: "This page does not exist!"});
});

module.exports = router;