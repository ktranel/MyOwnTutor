const {FindUser} = require('./Course_DB');

async function CourseSearch(options){
    return await FindUser(options);
}

module.exports = {
    CourseSearch
};