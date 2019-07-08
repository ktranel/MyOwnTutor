module.exports = (sequelize, Datatypes) => sequelize.define('section', {
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
        allowNull: false,
        required: true,
    },
    place: {
        type: Datatypes.INTEGER,
        allowNull: false,
        required: true,
    },
    updated_at: { type: Datatypes.DATE },
},
{
    underscored: true,
});
