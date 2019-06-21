const express = require('express');
const validate = require('validate.js');

// Services
const coursedB = require('../Services/Courses/Course_DB');
const courseService = require('../Services/Courses/Course');
const historyDb = require('../Services/Courses/Course_History_DB');
const courseHistory = require('../Services/Courses/CourseHistory');

const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler');

// databases
const db = require('../models');

// course factories
const coursedBHandler = coursedB(db);
const lookup = courseService.lookupFactory(coursedBHandler);
const createCourse = courseService.createFactory(coursedBHandler);

// history factories
const historyDbHandler = historyDb(db);
const createHistory = courseHistory.versionFactory(historyDbHandler);

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
    let course = await createCourse({ title, user_id: user.id, description });

    // create course version history
    const params = {
        course_id: course.id,
        user_id: user.id,
        title: course.title,
        description: course.description,
        version: 1,
        status: course.status,
    };
    const history = await createHistory(params);
    course.version = history.version;
    return res.status(200).json({ course });
}));

module.exports = router;
