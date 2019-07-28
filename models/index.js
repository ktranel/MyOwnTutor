

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config');
const db = {};

if (config.node_env === 'dev') console.log(config);

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    dialect: 'mysql',
    host: config.db.host,
    logging: false,
});


fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ASSOCIATIONS

/** **********---------------*********
 ************| Content SERVICE |*********
 ************---------------********* */
// Answer
db.answer.belongsTo(db.question);

// Questions
db.question.hasMany(db.answer);
db.question.hasMany(db.response);
db.question.hasMany(db.question_video);

// Question Videos
db.question_video.belongsTo(db.question);
db.question_video.belongsTo(db.video);

// Response
db.response.belongsTo(db.question);

// Videos
db.video.hasMany(db.question_video);
/** ***********-----------------*******
 ************| COURSE SERVICE |*********
 ************-----------------******* */
// Courses
db.course.hasMany(db.course_history);
db.course.hasMany(db.course_section);

// Course History
db.course_history.belongsTo(db.course);

// Course Sections
db.course_section.belongsTo(db.course);
db.course_section.belongsTo(db.section);

// Section
db.section.hasMany(db.course_section);
db.section.hasMany(db.section_question);
db.section.hasMany(db.section_video);

// Section Question
db.section_question.belongsTo(db.section);

// Section Video
db.section_video.belongsTo(db.section);

/** **********---------------*********
************| USER SERVICE |*********
************---------------********* */
// Permissions
db.permission.hasMany(db.user);

// Users
db.user.belongsTo(db.permission);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db;
