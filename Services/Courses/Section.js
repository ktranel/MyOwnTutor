module.exports = (dbHandler) =>  {
    return {
        create: async ({ title, userId, courseId }) => {
            if (!dbHandler.create) throw new Error('db handler must have property create');
            return dbHandler.create({ title, userId, courseId });
        },
        /* @args
            - options : object
                - title
                - id
        */
        get: async (options) => {
            // validation
            if (!dbHandler.get) throw new Error('dbHandler must have property get');
            return dbHandler.get(options);
        },
        assign: async (courseId, sectionId) =>{
            if (!dbHandler.assign) throw new Error('dbHandler must have a property of assign');
            return dbHandler.assign(courseId, sectionId);
        },
    };
};
