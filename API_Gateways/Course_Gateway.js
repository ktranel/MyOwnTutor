const express = require('express');
const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler');
const validate = require('validate.js');

/*Services */
const Courses = require('../Services/Courses/Course_Service');

/*
Route to create a new course

@body
- title : string
- description : string
- status : string

@return
- json object
 */
router.post('/', asyncHandler(async (req, res)=>{
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
    const user_id = req.user.id;
    const validation = validate({title, status}, constraints);
    if(validation) return res.status(400).json({error:validation});

    //check if course title is unique
    const title_validation = await Courses.CourseSearch({title});
    if(title_validation) return res.status(400).json({error: `Title ${title} is already taken, please choose another`});

    //create new course
    const course = await Courses.CreateNewCourse({title, description, status, user_id});

    //create a new course version
}));

module.exports = router;