module.exports = (db) => {
    const { Op } = db.Sequelize;
    return {
        create: async (title, hostId, userId) => {
            if (!title) throw new Error('invalid arg; title');
            if (!hostId) throw new Error('invalid arg: hostId');
            if (!userId) throw new Error('invalid arg: userId');
            return db.video.create({
                title,
                host_id: hostId,
                user_id: userId,
            });
        },
        get: async (options) => {
            if (options.title || options.id) {
                return db.video.findOne({
                    where: {
                        [Op.or]: [
                            { title: options.title || null },
                            { id: options.id || null },
                        ],
                    },
                });
            }
            const limit = 20; // number of records per page
            const count = await db.video.count();
            const pages = Math.ceil(count / limit);
            const offset = limit * (options.page - 1);
            const attributes = ['id', 'title', 'created_at'];
            const query = { attributes, limit, offset, order:[['created_at', 'asc']] };
            const videos = await db.video.findAll(query);
            return {
                pages, count, page: options.page, videos,
            };
        },
    };
};
