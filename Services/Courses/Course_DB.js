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

module.exports = db => ({
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
        return await course.update({ status });
    },
    remove: async (id) => {
        const course = await db.findOne({ where: { id } });
        return await course.destroy({ force: true });
    },

    /* Function to get all courses
        * Takes in optional ids parameter  to only
        * get courses from a specific array of ids. */
    get: async (ids, page) => {
        const limit = 20; // number of records per page
        page = page || 1; // page number, default to 1
        const count = await db.course.findAndCountAll();
        const pages = Math.ceil(count / limit);
        const offset = limit * (page - 1);
        const query = { limit, offset };
        if (ids)query.where = { id: ids };
        const courses = await db.course.findAll(query);
        return {
            pages, count, page, courses,
        };
    },
    lookup: async (options) => {
        if (!options) throw new Error('arg error: options must be defined');
        if (!options.title) throw new Error('arg error: options does not have valid search property');
        const course = await db.course.findOne({
            where: {
                title: options.title,
            },
        });
        return course;
    },
});
