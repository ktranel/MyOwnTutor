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
        get: async ({ title, id }) => {
            if (!title && !id) throw new Error('options must have property title or id');
            if (title || id) {
                return db.video.findOne({
                    where: {
                        [Op.or]: [
                            { title: title || null },
                            { id: id || null },
                        ],
                    },
                });
            }
            return null;
        },
    };
};
