const {FindCourse, CreateCourse} = require('./Course_DB');

/*
This function searches for a course provided by the options

@args
- options : object
    - properties: id, title

@return object or null
 */
async function CourseSearch(options){
    return await FindCourse(options);
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

@return function -> resolves to object
 */
async function CreateNewCourse(options){
    return await CreateCourse(options);
}

module.exports = {
    CourseSearch,
    CreateNewCourse
};