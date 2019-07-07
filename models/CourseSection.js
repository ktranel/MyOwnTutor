

module.exports = (sequelize, Datatypes) => sequelize.define('course_section', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    course_id: {
        // fk from course table
        type: Datatypes.INTEGER,
        allowNull: false,
        required: true,
    },
    section_id: {
        // fk from section table
        type: Datatypes.INTEGER,
        allowNull: false,
        required: true,
    },
    updated_at: { type: Datatypes.DATE },
},
{
    underscored: true,
});
