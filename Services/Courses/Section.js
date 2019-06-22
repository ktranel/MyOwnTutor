const createSectionFactory = dbHandler => async ({ title, user_id }) => {
    if(!dbHandler.create) throw new Error('db handler must have property create');
    return dbHandler.create({title, user_id});
};

const assignSection = dbHandler => async (section_id, course_id) =>{
    //validation
    if (!section_id) throw new Error('arg error: section_id is required');
    if (!course_id) throw new Error('arg error: course_id is required');


};

module.exports = {
    createSectionFactory,
};

