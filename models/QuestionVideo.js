module.exports = (sequelize, Datatypes) => sequelize.define('question_video', {
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
    video_id: {
        // fk from the video table
        type: Datatypes.UUID,
        required: true,
        allowNull: false,
    },
    updated_at: { type: Datatypes.DATE },
},
{
    underscored: true,
});
