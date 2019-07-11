module.exports = dbHandler => ({
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
    /* args
            - id*
            - title*
            - page*
         */
    get: async (options) => {
        if (!dbHandler.get) throw new Error('dbHandler must have property get');
        if (!options.page) options.page = 1;
        return dbHandler.get(options);
    },
});
