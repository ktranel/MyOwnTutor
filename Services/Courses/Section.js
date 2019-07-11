module.exports = (dbHandler) =>  {
    return {
        create: async ({ title, userId, courseId }) => {
            if (!dbHandler.create) throw new Error('db handler must have property create');
            const sections = await dbHandler.get({ courseId });
            const place = sections.length + 1;
            return dbHandler.create({ title, userId, courseId, place });
        },
        /* @args
            - options : object
                - title
                - userId
                - courseId
        */
        get: async (options) => {
            // validation
            if (!dbHandler.get) throw new Error('dbHandler must have property get');
            return dbHandler.get(options);
        },
        assign: async (courseId, sectionId) => {
            if (!dbHandler.assign) throw new Error('dbHandler must have a property of assign');
            const found = await dbHandler.getCourseAssignment(sectionId);
            if (found.length > 0 ) throw new Error('Section is already assigned to a course');
            return dbHandler.assign(courseId, sectionId);
        },
        getQuestions: async (id) => {
            if (!dbHandler.getQuestions) throw new Error('dbHandler must have getQuestions property');
            if (!id) throw new Error('arg error: getQuestions expects id argument');
            return dbHandler.getQuestions(id);
        },
        getVideos: async (id) => {
            if (!dbHandler.getVideos) throw new Error('dbHandler must have getVideos property');
            if (!id) throw new Error('arg error: getQuestions expects id argument');
            return dbHandler.getVideos(id);
        },
        assignVideo: async (sectionId, videoId) =>{
            if (!dbHandler.assignVideo) throw new Error('dbHandler must have property assignVideo');
            if (!sectionId) throw new Error('arg error: sectionId must be defined');
            if (!videoId) throw new Error('arg error: videoId must be defined');
            return dbHandler.assignVideo(sectionId, videoId);
        },
        assignQuestion: async (sectionId, questionId) =>{
            if (!dbHandler.assignQuestion) throw new Error('dbHandler must have property assignQuestion');
            if (!sectionId) throw new Error('arg error: sectionId must be defined');
            if (!questionId) throw new Error('arg error: questionId must be defined');
            return dbHandler.assignQuestion(sectionId, questionId);
        },
        updatePlace: async (sectionId, place) => {
            // get all section in this course
            let sections = await dbHandler.getCourseAssignment(sectionId);
            sections = sections.sort((a, b) => a.place - b.place);
            // remove any sections that have a place < the insertion place
            sections = sections.filter(section => section.place >= place);

            const sectionPromises = sections.map((section) => {
                return new Promise((resolve) => {
                    dbHandler.updatePlace(section.id, section.place + 1).then(() => resolve());
                });
            });
            await Promise.all(sectionPromises);
            return dbHandler.updatePlace(sectionId, place);
        },
        updateContentPlace: async (sectionId, contentId) => {
            if (!sectionId) throw new Error('arg error: sectionId must be defined');
            if (!contentId) throw new Error('arg error: contentId must be defined');
            return dbHandler.updateContentPlace(sectionId, contentId);
        },
    };
};
