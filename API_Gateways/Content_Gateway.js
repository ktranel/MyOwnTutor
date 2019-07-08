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

    // pass to video service for creation
    const video = await Video.create(title, hostId, user.id);
    return res.status(200).json({ video });
}));

router.post('/question', blockStudent, asyncHandler(async (req, res) => {
    // get post body
    const { title, type, answer, responses } = req.body;
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
            type: 'string',
            length: { minimum: 1, maximum: 1000 },
        },
    };
    const validation = validate({ title, type, answer }, constraints);
    if (validation) return res.status(400).json({ error: validation });
    if (type === 'multiple choice'){
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
        const foundAnswer = responses.filter(item => item === answer);
        if (foundAnswer.length < 1) return res.status(400).json({ error: 'No response matches the answer provided' });
    }
    // check if question already exists
    const found = await Question.get({ title });
    if (found) return res.status(400).json({ error: `Question title: "${title}" already exists` });
    // create question
    const question = await Question.createQuestion(title, type, user.id);
    // create answer
    const newAnswer = await Question.createAnswer(question.id, answer);

    // begin creation of return object
    const createdQuestion = { question, answer: newAnswer };
    if (type === 'multiple choice') {
        const promises = responses.map(item => Question.createResponse(question.id, item));
        createdQuestion.responses = await Promise.all(promises);
    }

    return res.status(200).json({ question: createdQuestion });
}));
module.exports = router;
