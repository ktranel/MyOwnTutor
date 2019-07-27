module.exports = (db) => {
    const { Op } = db.Sequelize;
    return {
        create: async (title, type, userId, category) => {
            if (!title) throw new Error('invalid arg: title');
            if (!type) throw new Error('invalid arg: type');
            if (!userId) throw new Error('invalid arg: userId');
            return db.question.create({
                title,
                type,
                user_id: userId,
                category
            });
        },
        createAnswer: async (questionId, answer) => {
            if (!questionId) throw new Error('invalid arg: questionId');
            if (!answer) throw new Error('invalid arg: answer');
            return db.answer.create({
                question_id: questionId,
                answer,
            });
        },
        createResponse: async (questionId, response, answer) => {
            if (!questionId) throw new Error('invalid arg: questionId');
            if (!response) throw new Error('invalid arg: response');
            return db.response.create({
                question_id: questionId,
                response,
                answer,
            });
        },
        get: async (options) => {
            if (options.title || options.id) {
                const question = await db.question.findOne({
                    where: {
                        [Op.or]: [
                            { title: options.title || null },
                            { id: options.id || null },
                        ],
                    },
                    include: [db.answer, db.response],
                });
                const transformedQuestion = question.dataValues;
                transformedQuestion.responses = question.responses;
                transformedQuestion.answers = question.answers.length > 0 ? question.answers[0] : null;
                return transformedQuestion;
            }
            const limit = 20; // number of records per page
            const count = await db.question.count();
            const pages = Math.ceil(count / limit);
            const offset = limit * (options.page - 1);
            const query = { limit, offset };
            const questions = await db.question.findAll(query);
            return {
                pages, count, page: options.page, questions,
            };
        },
        assignVideo: async (questionId, videoId) => {
            return db.question_video.create({
                question_id: questionId,
                video_id: videoId,
            });
        },
        getVideos: async (questionId) => {
            return db.question_video.findAll({
                where: { question_id: questionId},
            });
        },
    };
};
