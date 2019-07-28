module.exports = (sequelize, Datatypes) => sequelize.define('question', {
    id: {
        type: Datatypes.UUID,
        primaryKey: true,
        defaultValue: Datatypes.UUIDV4,
    },
    type: {
        // fk from the section table
        type: Datatypes.STRING,
        required: true,
        allowNull: false,
    },
    title: {
        // fk from question table
        type: Datatypes.TEXT,
        required: true,
        allowNull: false,
    },
    user_id: {
        // key to user table
        type: Datatypes.UUID,
        required: true,
        allowNull: false,
    },
    category: {
        type: Datatypes.STRING,
        required: false,
        defaultValue: 'uncategorized',
    },
    updated_at: { type: Datatypes.DATE },
    deleted_at: { type: Datatypes.DATE },
},
{
    underscored: true,
    paranoid: true,
});
