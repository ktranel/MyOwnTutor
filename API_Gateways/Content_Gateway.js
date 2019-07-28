const express = require('express');
const router = express.Router();
const validate = require('validate.js');

// middlewares
const asyncHandler = require('../Helpers/asyncHandler');
const blockStudent = require('../middleware/block_student');

// databases
const db = require('../models');

// const db handlers
const videoDb = require('../Services/Content/Video_DB');
const videoDbHandler = videoDb(db);
const questionDb = require('../Services/Content/Question_DB');
const questionDbHandler = questionDb(db);

// Services
const videoService = require('../Services/Content/Video');
const Video = videoService(videoDbHandler);
const questionService = require('../Services/Content/Question');
const Question = questionService(questionDbHandler);

/* route to create a video
@body
    - title: string
    - hostId: string
 */
router.post('/video', blockStudent, asyncHandler(async (req, res) => {
    // get post body
    const { title, hostId } = req.body;
    const { user } = req;
    // validation
    const constraints = {
        title: {
            presence: true,
            type: 'string',
            length: { minimum: 1, maximum: 500 },
        },
        hostId: {
            presence: true,
            type: 'string',
            length: { minimum: 1 },
        },
    };
    const validation = validate({ title, hostId }, constraints);
    if (validation) return res.status(400).json({ error: validation });
    // ensure video doesn't already exist
    const found = await Video.get({ title });
    if (found) return res.status(400).json({ error: `Video with title: ${title} already exists` });
    // pass to video service for creation
    const video = await Video.create(title, hostId, user.id);
    return res.status(200).json({ video });
}));

/* route to create a question
@body
    -title
    - type : string
    - answer: array
    - responses: array
    - category: string
 */
router.post('/question', blockStudent, asyncHandler(async (req, res) => {
    // get post body
    const { title, type, answer, responses } = req.body;
    const category = req.body.category || 'uncategorized';
    const { user } = req;
    // validation
    const constraints = {
        title: {
            presence: true,
            type: 'string',
            length: { minimum: 1, maximum: 1000 },
        },
        type: {
            presence: true,
            type: 'string',
            inclusion: {
                within: ['text', 'multiple choice'],
                message: '^%{value} is not included in list: text, multiple choice',
            },
        },
        answer: {
            presence: true,
            type: 'array',
        },
        category: {
            type: 'string',
            inclusion: {
                within: ['chemistry', 'physics', 'math'],
                message: '^%{value} is not included in list',
            },
        },
    };
    const validation = validate({ title, type, answer, category }, constraints);
    if (validation) return res.status(400).json({ error: validation });
    if (answer.length < 1) return res.status(400).json({ error: 'Answer array must have at least 1 answer' });
    if (type === 'multiple choice') {
        if (!responses || responses.length < 2) return res.status(400).json({ error: 'invalid responses in post body' });
        // ensure no duplicate responses and that 1 response is equal to answer
        const duplicates = {};
        let check = false;
        responses.forEach((item) => {
            if (duplicates[item]) {
                check = true;
                return;
            }
            duplicates[item] = true;
        });
        if (check) return res.status(400).json({ error: 'Response array contains duplicate responses' });
        const foundAnswer = answer.filter((item) => {
            const match = responses.filter(response => response === item);
            return match.length > 0;
        });
        if (foundAnswer.length < 1) return res.status(400).json({ error: 'No response matches the answer provided' });
    }
    // check if question already exists
    const found = await Question.get({ title });
    if (found) return res.status(400).json({ error: `Question title: "${title}" already exists` });
    // create question
    const question = await Question.createQuestion(title, type, user.id, category);
    const createdQuestion = { question };
    // create answer
    if (type === 'text') {
        createdQuestion.answer = await Question.createAnswer(question.id, answer[0]);
    }

    if (type === 'multiple choice') {
        const promises = responses.map((item) => {
            // check if response is also in answer list
            const associatedAnswer = answer.filter(unit => unit === item);
            let responseAnswer = false;
            if (associatedAnswer.length > 0) responseAnswer = true;
            return Question.createResponse(question.id, item, responseAnswer);
        });
        createdQuestion.responses = await Promise.all(promises);
    }

    return res.status(200).json({ question: createdQuestion });
}));

/* Route to get a list of videos or a single video
@query
    - id*
    - title*
    - page* (defaults to 1)
 */
router.get('/videos', asyncHandler(async (req, res) => {
    // get query string
    const { id, title, page } = req.query;
    const videos = await Video.get({ id, title, page });
    videos.videos = videos.videos.map(video => ({
        id: video.id,
        title: video.title,
        last_edited: video.dataValues.created_at,
    }));
    return res.status(200).json({ videos });
}));

/* Route to get a list of questions or a single question
@query
    - id*
    - page* (defaults to 1)
 */
router.get('/questions', asyncHandler(async (req, res) => {
    // get query string
    const { id, page } = req.query;
    const questions = await Question.get({ id, page });
    return res.status(200).json({ questions });
}));

/* Route to assign a video to a question
@body
    - questionId : string
    - videoIds : array
 */
router.post('/question/video/assign', blockStudent, asyncHandler(async (req, res) => {
    // get post body
    const { questionId, videoIds } = req.body;
    // validation
    const constraints = {
        questionId: {
            presence: true,
            type: 'string',
        },
        videoIds: {
            presence: true,
            type: 'array',
        },
    };
    const validation = validate({ questionId, videoIds }, constraints);
    if (validation) return res.status(400).json({ error: validation });
    // verify question exists
    const question = await Question.get({ id: questionId });
    if (!question) return res.status(400).json({ error: `Question Id: ${questionId} is not a valid question id` });
    // verify videos exists
    const videoVerifyPromises = videoIds.map((video) => (
        new Promise((resolve) => Video.get({ id: video }).then(v => resolve(v)))
    ));
    let videos = await Promise.all(videoVerifyPromises);
    const invalids = videos.filter(video => !(video));
    videos = videos.filter(video => video);
    if (invalids.length > 1) return res.status(400).json({ error: `Video Ids: ${invalids.join(', ')} were not valid` });
    // assign video to question
    const assignmentPromises = videos.map((video) => (
        new Promise((resolve) => Question.assignVideo(question.id, video.id).then(a => resolve(a)))
    ));
    const assignment = await Promise.all(assignmentPromises);
    return res.status(200).json({ success: assignment });
}));

/* Route to get all the videos assigned to a question
@query
    - questionId : string
 */
router.get('/question/videos', blockStudent, async (req, res) => {
    const { questionId } = req.query;
    const constraints = {
        questionId: {
            presence: true,
            type: 'string',
        },
    };
    const validation = validate({ questionId }, constraints);
    if (validation) return res.status(400).json({ error: validation });
    const videos = await Question.getVideos(questionId);
    return res.status(200).json({ videos });
});
module.exports = router;
