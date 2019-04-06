//Gateway for User routes
const express = require('express');
const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler');
const validate = require('validate.js');

/*
Services
 */
const User = require('../Services/Users/User_Service');

//route to create a user
/*
@body
- first_name : string
- last_name : string
- username : string
- password : string
- email : string
- permission_id* : int
 */
router.post('/', asyncHandler( async (req, res)=>{
    const constraints = {
        first_name: {
            presence :true,
            length:{maximum:50}
        },
        last_name: {
            presence :true,
            length:{maximum:50}
        },
        username: {
            presence :true,
            length: {minimum:8, maximum:20}
        },
        password: {
            presence :true,
            length: {minimum:8, maximum:20}
        },
        email: {
            presence :true,
            email: true
        },
    }
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const permission_id = req.body.permission_id;

    const validation = validate({first_name, last_name, username, password, email}, constraints);

    if(validation) return res.status(400).json({error: validation});

    //forward user service
    const found_user = await  User.ValidateUserExists(username, email);
    if(found_user){
        if(username === found_user.username) return res.status(400).json({error: `Username: ${username} is already taken`});
        if(email === found_user.email) return res.status(400).json({error: `Email: ${email} is already taken`});
    }

    const new_user = await User.CreateNewUser({first_name, last_name, username, password, email, permission_id});

    return res.status(200).json({user: new_user});
}));

module.exports = router;