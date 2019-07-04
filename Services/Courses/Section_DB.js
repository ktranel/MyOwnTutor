module.exports = db => ({
    create: async ({ title, userId, courseId }) => {
        if (!title) throw new Error('arg error: title is required');
        if (!userId) throw new Error('arg error: userId is required');
        if (!courseId) throw new Error('arg error: courseId is required');
        return db.section.create({
            title,
            user_id: userId,
            course_id: courseId,
        });
    },
    assign: async (courseId, sectionId) => {
        if (!courseId) throw new Error('invalid arg: courseId');
        if (!sectionId) throw new Error('invalid arg: sectionId');
        return db.course_section.create({
            course_id: courseId,
            section_id: sectionId,
        });
    },
    get: async (options) => {
        // get a single section by its id
        if (options.id) {
            return db.section.findOne({
                where: { id: options.id },
            });
        }
        // get a list of sections by their course
        if (options.courseId) {
            const sections = await db.course_section.findAll({
                where: { course_id: options.courseId },
            });
            if (sections.length === 0) return sections;
            const sectionIds = sections.map(section => section.section_id);
            return db.section.findAll({
                where: { id: sectionIds },
            });
        }
        return null;
    },
    getQuestions: async (id) => {
        if (!id) throw new Error('arg error: id');
        return db.section_question.findAll({
            where: { section_id: id },
        });
    },
    getVideos: async (id) => {
        if (!id) throw new Error('arg error: id');
        return db.section_video.findAll({
            where: { section_id: id },
        });
    },
    assignVideo: async (sectionId, videoId) => {
        if (!sectionId) throw new Error('arg error: sectionId must be defined');
        if (!videoId) throw new Error('arg error: videoId must be defined');
        return db.section_video.create({
            section_id: sectionId,
            video_id: videoId,
        });
    },
    assignQuestion: async (sectionId, questionId) => {
        if (!sectionId) throw new Error('arg error: sectionId must be defined');
        if (!questionId) throw new Error('arg error: questionId must be defined');
        return db.section_question.create({
            section_id: sectionId,
            question_id: questionId,
        });
    },
});
