module.exports = (dbHandler) => {
    return {
        create: async (title, hostId, userId) => {
            // make sure dbHandler has correct methods
            if (!dbHandler.create) throw new Error('dbHandler must have property create');
            // make sure correct variables are present
            if (!title) throw new Error('invalid arg; title');
            if (!hostId) throw new Error('invalid arg: vimeoId');
            if (!userId) throw new Error('invalid arg: userId');
            // create question
            return dbHandler.create(title, hostId, userId);
        },
    };
};
