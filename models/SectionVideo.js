

module.exports = (sequelize, Datatypes) => sequelize.define('section_video', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    video_id: {
        // fk from the course table
        type: Datatypes.UUID,
        required: true,
        allowNull: false,
    },
    section_id: {
        // fk from the section table
        type: Datatypes.INTEGER,
        required: true,
        allowNull: false,
    },
    updated_at: { type: Datatypes.DATE },
},
{
    underscored: true,
});
