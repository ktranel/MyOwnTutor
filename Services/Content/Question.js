module.exports = (dbHandler) => {
    return {
        createQuestion: async (title, type, userId) => {
            if (!dbHandler.create) throw new Error('dbHandler must have property create');
            if (!title) throw new Error('invalid arg: title');
            if (!type) throw new Error('invalid arg: type');
            if (!userId) throw new Error('invalid arg: userId');
            return dbHandler.create(title, type, userId);
        },
        createResponse: async (questionId, response) => {
            if (!dbHandler.createResponse) throw new Error('dbHandler must have property createResponse');
            if (!questionId) throw new Error('invalid arg: questionId');
            if (!response) throw new Error('invalid arg: response');
            return dbHandler.createResponse(questionId, response);
        },
        createAnswer: async (questionId, answer) => {
            if (!dbHandler.createAnswer) throw new Error('dbHandler must have property createAnswer');
            if (!questionId) throw new Error('invalid arg: questionId');
            if (!answer) throw new Error('invalid arg: answer');
            return dbHandler.createAnswer(questionId, answer);
        },
        get: async ({ title, id }) => {
            if (!dbHandler.get) throw new Error('dbHandler must have property get');
            if (!title && !id) throw new Error('title or id property not present on option arg');
            return dbHandler.get({ title, id });
        },
    };
};
