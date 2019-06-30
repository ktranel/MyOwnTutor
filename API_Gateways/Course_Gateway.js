const express = require('express');
const validate = require('validate.js');

// databases
const db = require('../models');

// db handlers
const coursedB = require('../Services/Courses/Course_DB');
const coursedBHandler = coursedB(db);
const sectionDb = require('../Services/Courses/Section_DB');
const sectionDbHandler = sectionDb(db);
const courseHistoryDb = require('../Services/Courses/Course_History_DB');
const historyDbHandler = courseHistoryDb(db);

// Middlewares
const blockStudent = require('../middleware/block_student');

// Services
const courseService = require('../Services/Courses/Course');
const Course = courseService(coursedBHandler);

const courseHistory = require('../Services/Courses/CourseHistory');
const CourseHistory = courseHistory(historyDbHandler);

const sectionService = require('../Services/Courses/Section');
const Section = sectionService(sectionDbHandler);

const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler');

/*
Route to create a new course
    @Body
        -title
        -description*
        -
 */

router.post('/', blockStudent, asyncHandler(async (req, res) => {
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
    const found = await Course.lookup({ title });
    if (found) return res.status(400).json({ error: `Course with title '${title}' already exists` });

    // create course
    const course = await Course.create({ title, user_id: user.id, description });

    // create course version history
    const params = {
        course_id: course.id,
        user_id: user.id,
        title: course.title,
        description: course.description,
        version: 1,
        status: course.status,
    };
    const history = await CourseHistory.createHistory(params);
    course.version = history.version;
    return res.status(200).json({ course });
}));

/* Route to create a new section of a course
 * @body
 *      - title : string
 *      - courseId : string
 */
router.post('/section', blockStudent, asyncHandler(async (req, res) => {
    // validation
    const { title, courseId } = req.body;
    const { user } = req;
    if (!title) return res.status(400).json({ error: 'arg error: post body is missing title field' });
    const constraints = {
        title: {
            presence: true,
            type: 'string',
        },
        courseId: {
            presence: true,
            type: 'number',
        },
    };
    const validation = validate({ title, courseId }, constraints);
    if (validation) return res.status(400).json({ error: validation });

    // make sure course exists
    const course = await Course.lookup({ id: courseId });
    if (!course) return res.status(400).json({ error: 'Course not found' });

    // validate that course doesn't already have section
    const courseSections = await Section.get({ courseId: course.id });
    const identialSection = courseSections.filter(section => section.title === title);
    if (identialSection.length > 0) return res.status(400).json({ error: 'Course section title already taken' });

    // create section
    const newSection = await Section.create({ title, userId: user.id, courseId: course.id });

    // assign section to course
    await Section.assign(course.id, newSection.id);
    return res.status(200).json({ section: newSection});
}));

module.exports = router;
