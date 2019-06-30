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

// Services
const videoService = require('../Services/Content/Video');
const Video = videoService(videoDbHandler);

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

module.exports = router;
