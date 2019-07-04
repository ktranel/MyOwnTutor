module.exports = (db) => {
    const { Op } = db.Sequelize;
    return {
        create: async (title, type, userId) => {
            if (!title) throw new Error('invalid arg: title');
            if (!type) throw new Error('invalid arg: type');
            if (!userId) throw new Error('invalid arg: userId');
            return db.question.create({
                title,
                type,
                user_id: userId,
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
        createResponse: async (questionId, response) => {
            if (!questionId) throw new Error('invalid arg: questionId');
            if (!response) throw new Error('invalid arg: response');
            return db.response.create({
                question_id: questionId,
                response,
            });
        },
        get: async ({ title, id }) => {
            if (!title && !id) throw new Error('options must have property title or id');
            if (title || id) {
                return db.question.findOne({
                    where: {
                        [Op.or]: [
                            { title: title || null },
                            { id: id || null },
                        ],
                    },
                });
            }
            return null;
        },
    };
};
