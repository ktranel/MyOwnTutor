module.exports = dbHandler => ({
    createQuestion: async (title, type, userId, category) => {
        if (!dbHandler.create) throw new Error('dbHandler must have property create');
        if (!title) throw new Error('invalid arg: title');
        if (!type) throw new Error('invalid arg: type');
        if (!userId) throw new Error('invalid arg: userId');
        return dbHandler.create(title, type, userId, category);
    },
    createResponse: async (questionId, response, answer) => {
        if (!dbHandler.createResponse) throw new Error('dbHandler must have property createResponse');
        if (!questionId) throw new Error('invalid arg: questionId');
        if (!response) throw new Error('invalid arg: response');
        return dbHandler.createResponse(questionId, response, answer);
    },
    createAnswer: async (questionId, answer) => {
        if (!dbHandler.createAnswer) throw new Error('dbHandler must have property createAnswer');
        if (!questionId) throw new Error('invalid arg: questionId');
        if (!answer) throw new Error('invalid arg: answer');
        return dbHandler.createAnswer(questionId, answer);
    },
    /* args
            - id*
            - page* (defaults to 1)
         */
    get: async (options) => {
        if (!dbHandler.get) throw new Error('dbHandler must have property get');
        if (!options.page) options.page = 1;
        return dbHandler.get(options);
    },
    assignVideo: async (questionId, videoId) => {
        return dbHandler.assignVideo(questionId, videoId);
    },
    getVideos: async (questionId) => {
        return dbHandler.getVideos(questionId);
    },
});
