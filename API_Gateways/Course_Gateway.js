const express = require('express');
const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler');
const validate = require('validate.js');

/*
Route to create a new course

@body
- title : string
- description : string
- status : string

@return
- json object
 */
router.post('/', asyncHandler((req, res)=>{
    //validation
    const constraints = {
        title:{
            presence: true,
        },
        status:{
            presence:true,
            inclusion: {
                within: {"draft": "draft", "published": "published", "unpublished": "unpublished"},
                message: "^Status %{value} must be either draft, published, or unpublished"
            }
        }
    }
    const title = req.body.title;
    const description = req.body.description || null;
    const status = req.body.status;
    const validation = validate({title, status}, constraints);
    if(validation) return res.status(400).json({error:validation});
    //check if course title is unique

    //create new course

    //change the status of course

    //create a new course version
}));

module.exports = router;