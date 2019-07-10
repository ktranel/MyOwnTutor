module.exports = (db) => {
    const { Op } = db.Sequelize;
    return {
        create: async ({ title, userId, courseId, place }) => {
            if (!title) throw new Error('arg error: title is required');
            if (!userId) throw new Error('arg error: userId is required');
            if (!courseId) throw new Error('arg error: courseId is required');
            if (!place) throw new Error('arg error: place is required');
            return db.section.create({
                title,
                user_id: userId,
                course_id: courseId,
                place,
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
                    where: {id: sectionIds},
                });
            }
            return null;
        },
        getQuestions: async (id) => {
            if (!id) throw new Error('arg error: id');
            return db.section_question.findAll({
                where: {section_id: id},
            });
        },
        getVideos: async (id) => {
            if (!id) throw new Error('arg error: id');
            return db.section_video.findAll({
                where: {section_id: id},
            });
        },
        getCourseAssignment: async (sectionId) => {
            return db.course_section.findAll({
                where: { section_id: sectionId },
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
        updatePlace: async (sectionId, place) => {
            const section = await this.get({ id: sectionId });
            return section.update({ place });
        },
        updateContentPlace: async (sectionId, contentId) => {
            let video = db.section_video.findOne({ where: { section_id: sectionId, video_id: contentId } });
            let question = db.section_question.findOne({ where: { section_id: sectionId, question_id: contentId } });
            [video, question] = await Promise.all([video, question ]);
            if (video) return video.update({ updated_at: new Date() });
            if (question) return question.update({ updated_at: new Date() });
            return null;
        },
    };
};
