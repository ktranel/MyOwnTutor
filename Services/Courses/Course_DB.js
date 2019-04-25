const db = require('../../models');
const validate  = require('validate.js');

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

/*
Function to create a course

@args
- options : object
    properties:
        - title
        - description
        - status
        - user_id

@return course object
 */
async function CreateCourse(options){
    const constraints = {
        user_id: {presence: true},
        title: { presence: true},
        status: {
            presence: true,
            inclusion: {
                within: {"draft": "draft", "published": "published", "unpublished": "unpublished"},
                message: "^Status %{value} must be either draft, published, or unpublished"
            }
        }
    };
    const options_validation = validate({
        user_id: options.user_id,
        title: options.title,
        status: options.status
    }, constraints);
    if(options_validation) throw new Error(JSON.stringify(options_validation));

    return await db.course.create({
        user_id: options.user_id,
        title: options.title,
        description: options.description,
        status: options.status
    })
}

module.exports = {
    FindCourse,
    CreateCourse
}