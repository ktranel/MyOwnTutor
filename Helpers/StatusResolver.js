module.exports = async (db, { id, status }) => {
    const { Op } = db.Sequelize;
    return db.status.findOne({
        where: {
            [Op.or] : [
                { id: id || null },
                { status: status || null },
            ],
        },
    });
};