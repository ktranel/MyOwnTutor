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
const videoDb = require('../Services/Content/Video_DB');
const videoDbHandler = videoDb(db);
const questionDb = require('../Services/Content/Question_DB');
const questionDbHandler = questionDb(db);

// Middlewares
const blockStudent = require('../middleware/block_student');

// Services
const courseService = require('../Services/Courses/Course');
const Course = courseService(coursedBHandler);

const courseHistory = require('../Services/Courses/CourseHistory');
const CourseHistory = courseHistory(historyDbHandler);

const sectionService = require('../Services/Courses/Section');
const Section = sectionService(sectionDbHandler);

const videoService = require('../Services/Content/Video');
const Video = videoService(videoDbHandler);

const questionService = require('../Services/Content/Question');
const Question = questionService(questionDbHandler);

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

/* Route to assign a video to a section
@body
    - sectionId : int
    - videoId : int
 */
router.post('/section/video', blockStudent, asyncHandler(async (req, res) => {
    // get post body
    const { sectionId, videoId } = req.body;
    // validation
    const constraints = {
        sectionId: {
            presence: true,
            type: 'integer',
        },
        videoId: {
            presence: true,
            type: 'integer',
        },
    };
    const validation = validate({ sectionId, videoId }, constraints);
    if (validation) return res.status(400).json({ error: validation });
    // make sure section exists
    const section = await Section.get({ id: sectionId });
    if (!section) return res.status(400).json({ error: 'Section id is invalid or could not be found' });
    // make sure the video exists
    const video = await Video.get({ id: videoId });
    if (!video) return res.status(400).json({ error: 'Video id is invalid or could not be found' });
    // make sure video isn't already assigned to section
    const videoList = await Section.getVideos(sectionId);
    const found = videoList.filter(item => item.video_id === videoId);
    if (found.length !== 0) return res.status(400).json({ error: 'video is already assigned to section' });
    // assign video to section
    const sectionVideo = await Section.assignVideo(section.id, video.id);
    return res.status(200).json({ success: sectionVideo });
}));

/* Route to assign a question to a section
@body
    - sectionId : int
    - questionId : int
 */
router.post('/section/question', blockStudent, asyncHandler( async (req, res) => {
    
}))

/* Route to get a course or list of courses at 20/page
@query
    - id * : (int)
    - page * : (int) defaults to 1 if no id is present
*/
router.get('/', asyncHandler(async (req, res) => {
    // get query parameters
    let { id, page } = req.query;
    page = parseInt(page, 10);
    id = parseInt(id, 10);
    if (!page) page = 1;

    // get ids of courses based on page if not provided
    let courses;
    if (!id) {
        courses = await Course.get(page);
    } else {
        courses = await Course.lookup({ id });
        courses = [...courses];
    }

    // package course objects
    const promises = courses.map((course) => {
        return new Promise((resolve) => {
            Section.get({ courseId: course.id })
                .then((sectionList) => {
                    const sectionPromises = sectionList.map((section) => {
                        return new Promise((resolve1) => {
                            const questionPromises = Section.getQuestions(section.id);
                            const videoPromises = Section.getVideos(section.id);
                            const contentPromises = questionPromises.concat(videoPromises);
                            Promise.all(contentPromises)
                                .then((contentList) => {
                                    const contentPromises2 = contentList.map((content) => {
                                        return new Promise((resolve2) => {
                                            if (content.video_id){
                                                Video.get({ id: content.video_id })
                                                    .then(video => resolve2(video));
                                            } else {
                                                Question.get({ id: content.question_id })
                                                    .then(question => resolve2(question));
                                            }
                                        });
                                    });
                                    Promise.all(contentPromises2)
                                        .then((newContentList) => {
                                            const returnSection = {
                                                section,
                                                content: newContentList,
                                            };
                                            return resolve1(returnSection);
                                        });
                                });
                        });
                    });
                    Promise.all(sectionPromises)
                        .then(sections => resolve({ course, sections }));
                });
        });
    });
    const resolveEverything = await Promise.all(promises);
    return res.status(200).json({ resolveEverything });
}));

module.exports = router;
