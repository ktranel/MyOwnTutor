module.exports = (db) => {
    const { Op } = db.Sequelize;
    return {
        create: async ({ title, userId, courseId }) => {
            if (!title) throw new Error('arg error: title is required');
            if (!userId) throw new Error('arg error: userId is required');
            if (!courseId) throw new Error('arg error: courseId is required');
            if (!place) throw new Error('arg error: place is required');
            return db.section.create({
                title,
                user_id: userId,
                course_id: courseId,
            });
        },
        assign: async (courseId, sectionId) => {
            if (!courseId) throw new Error('invalid arg: courseId');
            if (!sectionId) throw new Error('invalid arg: sectionId');
            let place = await db.course_section.max('place', { where: { course_id: courseId } });
            if (!place) place = 1;
            return db.course_section.create({
                course_id: courseId,
                section_id: sectionId,
                place,
            });
        },
        get: async (options) => {
            // get a single section by its id
            if (options.id) {
                return db.section.findOne({
                    where: {id: options.id},
                });
            }
            // get a list of sections by their course
            if (options.courseId) {
                const sections = await db.course_section.findAll({
                    where: {course_id: options.courseId},
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
        updatePlace: async(sectionId, place, courseId) => {
            if (!courseId) {
                const assignment = await db.course_section.findAll({
                    where: { section_id: sectionId },
                });
                if (assignment.length > 1) throw new Error('This section is assigned to multiple courses. Please provide courseId option');
                if (assignment[0]) courseId = assignment[0].course_id;
            }
            // prevent entry of a place above the max value of the highest place
            let max = await db.course_section.max('place', { where: { course_id: courseId } });
            if (!max) max = 1;
            if (place > max + 1) place = max + 1;
            // update any sections greater than the current sections place
            const sectionList = await db.course_section.findAll({
                where: {
                    course_id: courseId,
                    place: { [Op.gte]: place },
                },
            });
            const sectionPromises = sectionList.map(section => {
                return new Promise((resolve) => {
                    section.updateAttributes({ place: section.place + 1 })
                        .then(() => resolve());
                });
            });
            await Promise.all(sectionPromises);
            const section = await this.get({ id: sectionId });
            return section.updateAttributes({ place });
        },
    };
};
