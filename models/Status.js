module.exports = (sequelize, Datatypes) => sequelize.define('status', {
    id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        // fk from the user table
        type: Datatypes.STRING,
        required: true,
        allowNull: false,
    },
},
{
    underscored: true,
});
