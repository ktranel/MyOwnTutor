module.exports = (db) => {
    return {
        create: async (title, hostId, userId) =>{
            if (!title) throw new Error('invalid arg; title');
            if (!hostId) throw new Error('invalid arg: hostId');
            if (!userId) throw new Error('invalid arg: userId');
            return db.video.create({
                title,
                host_id: hostId,
                user_id: userId,
            });
        },
    };
};
