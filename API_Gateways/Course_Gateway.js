const express = require('express');
const validate = require('validate.js');

// helper functions
const StatusResolve = require('../Helpers/StatusResolver');

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
const userDb = require('../Services/Users/User_DB');
const userDbHandler = userDb(db);

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

const userService = require('../Services/Users/User_Service');
const User = userService(userDbHandler);

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
    return res.status(200).json({ section: newSection });
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
router.post('/section/question', blockStudent, asyncHandler(async (req, res) => {
    // get post body
    const { sectionId, questionId } = req.body;
    // validation
    const constraints = {
        sectionId: {
            presence: true,
            type: 'integer',
        },
        questionId: {
            presence: true,
            type: 'integer',
        },
    };
    const validation = validate({ sectionId, questionId }, constraints);
    if (validation) return res.status(400).json({ error: validation });
    // make sure section exists
    const section = await Section.get({ id: sectionId });
    if (!section) return res.status(400).json({ error: 'Section id is invalid or could not be found' });
    // make sure the question exists
    const question = await Question.get({ id: questionId });
    if (!question) return res.status(400).json({ error: 'Question id is invalid or could not be found' });
    // make sure question isn't already assigned to section
    const questionList = await Section.getQuestions(sectionId);
    const found = questionList.filter(item => item.question_id === question.id);
    if (found.length !== 0) return res.status(400).json({ error: 'question is already assigned to section' });
    // assign question to section
    const sectionQuestion = await Section.assignQuestion(section.id, question.id);
    return res.status(200).json({ success: sectionQuestion });
}));

/* Route to get a course or list of courses at 20/page
@query
    - id * : int
    - title* : string
    - page * : int defaults to 1 if no id is present
*/
router.get('/', asyncHandler(async (req, res) => {
    // get query parameters
    let { id, title, page } = req.query;
    page = parseInt(page, 10);
    id = parseInt(id, 10);
    if (!page) page = 1;

    // get ids of courses based on page if not provided
    let courses; let pages; let count;
    if (id) {
        courses = await Course.lookup({ id });
        courses = [courses];
    } else if (title) {
        courses = await Course.lookup({ title });
        courses = [courses];
    } else {
        const results = await Course.get(page);
        courses = results.courses;
        pages = results.pages;
        page = results.page;
        count = results.count;
    }
    courses = courses.filter(item => item !== null);
    if (courses.length < 1) return res.status(200).json({ result: courses });
    /* TODO: change into async/await for readability and test performance drop
    *  while this is no doubt a long chain of promises it ensures that a call to resolve
    * a large number of courses at once is scalable */

    // package course objects
    // create initial course promise array
    const promises = courses.map(course => new Promise((resolve) => {
        // get all the sections for each course
        Section.get({ courseId: course.id })
            .then((sectionList) => {
                // create promise array for each section
                const sectionPromises = sectionList.map(section => new Promise((resolve1) => {
                    // get all section questions and videos
                    const questionPromises = Section.getQuestions(section.id);
                    const videoPromises = Section.getVideos(section.id);
                    const contentPromises = [questionPromises, videoPromises];
                    // resolve 3rd promise array that gets all content assigned to sections
                    Promise.all(contentPromises)
                        .then((contentList) => {
                            // parse content lists and get either a video or a question
                            const list = [...contentList[0], ...contentList[1]];
                            list.sort((a, b) => {
                                const first = new Date(a.updated_at).getTime();
                                const second = new Date(b.updated_at).getTime();
                                return first - second;
                            });
                            // create 4th promise array to get questions and videos
                            const contentPromises2 = list.map(content => new Promise((resolve2) => {
                                if (content.video_id) {
                                    Video.get({ id: content.video_id })
                                        .then((video) => {
                                            const modified = {
                                                id: video.id,
                                                title: video.title,
                                                format: 'video',
                                                userId: video.user_id,
                                                lastEdited: video.updated_at,
                                                createdAt: video.created_at,
                                            };
                                            return resolve2(modified);
                                        });
                                } else {
                                    Question.get({ id: content.question_id })
                                        .then((question) => {
                                            const modified = {
                                                id: question.id,
                                                title: question.title,
                                                format: 'question',
                                                type: question.type,
                                                userId: question.user_id,
                                                lastEdited: question.updated_at,
                                                createdAt: question.created_at,
                                            };
                                            return resolve2(modified);
                                        });
                                }
                            }));
                            // resolve 4th promise array to get questions and videos
                            Promise.all(contentPromises2)
                                .then((newContentList) => {
                                    const returnSection = {
                                        id: section.id,
                                        title: section.title,
                                        place: section.place,
                                        lastEdited: section.updated_at,
                                        created: section.created_at,
                                        content: newContentList,
                                    };
                                    return resolve1(returnSection);
                                });
                        });
                }));
                    // resolve 2nd promise array of each section
                Promise.all(sectionPromises)
                    .then((sections) => {
                        const newCourse = {
                            id: course.id,
                            user_id: course.user_id,
                            title: course.title,
                            description: course.description,
                            status: course.status,
                            last_edited: course.updated_at,
                            sections,
                        };
                        resolve(newCourse);
                    });
            });
    }));
    // set entire promise chain into motion
    let allCourses = await Promise.all(promises);

    // get user info for courses
    const userPromises = allCourses.map(course => new Promise((resolve) => {
        User.userSearch(course.user_id)
            .then((user) => {
                const modified = course;
                modified.user = {
                    firstName: user.first_name,
                    last_name: user.last_name,
                };
                return resolve(modified);
            });
    }));
    allCourses = await Promise.all(userPromises);

    // get status info for courses
    const statusPromises = allCourses.map(course => new Promise((resolve) => {
        StatusResolve(db, { id: course.status })
            .then((status) => {
                const modified = course;
                modified.status = status.status;
                return resolve(modified);
            });
    }));
    allCourses = await Promise.all(statusPromises);
    if (!id) {
        return res.status(200).json({
            result: allCourses, pages, count, page,
        });
    }
    return res.status(200).json({ result: allCourses });
}));

/* Route to update a course section content order
@body
    - sectionId : int
    - content : array (of content ids)
        array should contain entire list of content in section and be in the
        new order desired
 */
router.put('/section/content-order', asyncHandler(async (req, res) => {
    // get post body
    const { sectionId, content } = req.body;
    // ensure section exists
    const section = await Section.get({ id: sectionId });
    if (!section) return res.status(400).json({ error: `Section not found with sectionId: ${sectionId}` });
    // get all the content assigned to that section
    let questions = Section.getQuestions(section.id);
    let videos = Section.getVideos(section.id);
    [questions, videos] = await Promise.all([questions, videos]);
    const assigned = [...videos, ...questions];
    // loop over the content array and update placement if in assigned list
    const newOrder = content.filter((item) => {
        const found = assigned.filter(assignee => assignee.id === item.id);
        if (found.length > 0) return item;
        return null;
    });
    // the following must be done synchronously to maintain order
    for (let i = 0; i < newOrder.length; i++) {
        await Section.updateContentPlace(section.id, newOrder[i]);
    }
    // get all the content assigned to that section
    let questions2 = await Section.getQuestions(section.id);
    let videos2 = await Section.getVideos(section.id);
    [questions2, videos2] = await Promise.all([questions2, videos2]);
    const assigned2 = [...videos2, ...questions2];
    assigned2.sort((a, b) => {
        const first = new Date(a.updated_at).getTime();
        const second = new Date(b.updated_at).getTime();
        return first - second;
    });
    return res.status(200).json({ result: assigned2 });
}));

module.exports = router;
