module.exports = (sequelize, Datatypes) => sequelize.define('answer', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    question_id: {
        // fk from the question table
        type: Datatypes.INTEGER,
        required: true,
        allowNull: false,
    },
    answer: {
        // fk from question table
        type: Datatypes.TEXT,
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
