'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config');
const db = {};

console.log(config);

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    dialect:'mysql',
    host:config.db.host
});


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//ASSOCIATIONS

//Courses
db.course.hasMany(db.course_history);
db.course.belongsTo(db.user);

//Course History
db.course_history.belongsTo(db.course);
db.course_history.belongsTo(db.user);

//Permissions
db.permission.hasMany(db.user);

//Users
db.user.hasMany(db.course);
db.user.hasMany(db.course_history);
db.user.belongsTo(db.permission);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db;
