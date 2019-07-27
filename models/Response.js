module.exports = (sequelize, Datatypes) => sequelize.define('response', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    question_id: {
        // fk from the question table
        type: Datatypes.UUID,
        required: true,
        allowNull: false,
    },
    response: {
        // fk from question table
        type: Datatypes.TEXT,
        required: true,
        allowNull: false,
    },
    answer: {
        type: Datatypes.BOOLEAN,
        required: true,
        allowNull: false,
        defaultValue: false,
    },
    updated_at: { type: Datatypes.DATE },
    deleted_at: { type: Datatypes.DATE },
},
{
    underscored: true,
    paranoid: true,
});
