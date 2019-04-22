const db = require('../../models');

/*
This function searches for a course provided by the options

@args
- options : object
    - properties: id, title

@return object or null
 */
async function FindCourse(options){
    let query = {};

    if(options.title) query.where = {title: options.title};
    if(options.id) query.where = {id: options.id};

    return await db.course.findOne(query);

}

module.exports = {
    FindCourse
}