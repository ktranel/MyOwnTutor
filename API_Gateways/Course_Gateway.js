const express = require('express');
const validate = require('validate.js');

// Services
const coursedB = require('../Services/Courses/Course_DB');
const courseService = require('../Services/Courses/Course');

const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler');

// databases
const db = require('../models');

// factories
const coursedBHandler = coursedB(db);
const lookup = courseService.lookupFactory(coursedBHandler);
const createCourse = courseService.createFactory(coursedBHandler);

/*
Route to create a new course
    @Body
        -title
        -description*
        -
 */

router.post('/', asyncHandler(async (req, res) => {
    // set route variables
    const { title, description } = req.body;
    const { user } = req;

    // validation
    const constraints = {
        title: {
            presence: true,
            format: {
                pattern: /^[-_ a-zA-Z0-9]+$/,
                message: 'can only contain a-z and 0-9',
            },
        },
    };
    const validation = validate({ title }, constraints);
    if (validation) return res.status(400).json({ error: validation });

    // see if course already exists
    const found = await lookup({ title });
    if (found) return res.status(400).json({ error: `Course with title '${title}' already exists` });

    // create course
    const course = await createCourse({ title, user_id: user.id, description });
    return res.status(200).json({ course });
}));

module.exports = router;