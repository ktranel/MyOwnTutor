const express = require('express');
const router = express.Router();
const passport = require('passport');

//Auth route
router.post('/', (req, res, next)=>{
    if (req.isAuthenticated()){
        req.logout();
        if (req.session) req.session.destroy();
        res.clearCookie('connect.sid');
    }
    next();
}, passport.authenticate('local'), (req, res)=>{
    //if you made it here, the user is real and authentic
    res.status(200).json({user: req.user});
});

//Route to check if a user is authenticated
//if so return that user
router.put('/refresh', (req, res)=>{
    //check if user is authenticated
    if(!req.isAuthenticated){
        return res.status(403).json({error:'Forbidden'});
    }

    //if you made it here, the user is real and authentic
    res.status(200).json({user: req.user});
});
module.exports = router;