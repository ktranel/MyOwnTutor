

module.exports = (sequelize, Datatypes) => sequelize.define('course', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        // key from the user table
        type: Datatypes.UUID,
        required: true,
        allowNull: false,
    },
    title: {
        type: Datatypes.STRING,
        required: true,
        allowNull: false,
    },
    description: {
        type: Datatypes.STRING,
        required: false,
        allowNull: true,
    },
    status: {
        type: Datatypes.STRING,
        required: true,
        allowNull: false,
    },
    updated_at: { type: Datatypes.DATE },
    deleted_at: { type: Datatypes.DATE },
},
{
    underscored: true,
    paranoid: true,
});
