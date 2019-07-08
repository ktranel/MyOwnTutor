const resolveStatus = (status) => {
    const newStatus = status.toLowerCase();
    switch (newStatus) {
    case 'draft':
        return 1;

    case 'published':
        return 2;

    case 'archived':
        return 3;

    default:
        return 1;
    }
};

module.exports = (db) => {
    const { Op } = db.Sequelize;
    return {
        createCourse: async (options) => {
            if (!options.title) throw new Error('Argument error: include title property');
            if (!options.user_id) throw new Error('Argument error: include user_id property');
            const course = await db.course.create({
                user_id: options.user_id,
                title: options.title,
                status: resolveStatus(options.status),
                description: options.description || null,
            });
            return course;
        },
        updateTitle: async (id, title) => {
            const course = await db.course.findOne({
                where: { id },
            });

            const returnCourse = await course.update({ title });
            return returnCourse;
        },
        updateUser: async (id, user_id) => {
            const course = await db.course.findOne({
                where: { id },
            });
            const returnCourse = await course.update({ user_id });
            return returnCourse;
        },
        updateDescription: async (id, description) => {
            const course = await db.course.findOne({
                where: { id },
            });
            const returnCourse = await course.update({ description });
            return returnCourse;
        },
        updateStatus: async (id, status) => {
            status = resolveStatus(status);
            const course = await db.course.findOne({
                where: { id },
            });
            return course.update({ status });
        },
        remove: async (id) => {
            const course = await db.findOne({ where: { id } });
            return await course.destroy({ force: true });
        },

        /* Function to get all courses
            * Takes in optional ids parameter  to only
            * get courses from a specific array of ids. */
        get: async (page) => {
            const limit = 20; // number of records per page
            const count = await db.course.findAndCountAll();
            const pages = Math.ceil(count / limit);
            const offset = limit * (page - 1);
            const query = { limit, offset };
            const courses = await db.course.findAll(query);
            return {
                pages, count, page, courses,
            };
        },
        lookup: async (options) => {
            if (!options) throw new Error('arg error: options must be defined');
            if (!options.title && !options.id) throw new Error('arg error: options does not have valid search property');
            const course = await db.course.findOne({
                where: {
                    [Op.or]: [
                        { id: options.id || null },
                        { title: options.title || null },
                    ],
                },
            });
            return course;
        },
    };
};
