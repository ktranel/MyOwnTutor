const express = require('express');
const router = express.Router();
const passport = require('passport');

//Auth route
router.post('/',  passport.authenticate('local'), (req, res)=>{
    //if you made it here, the user is real and authentic
});

module.export = router;