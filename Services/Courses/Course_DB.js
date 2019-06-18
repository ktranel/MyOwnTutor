module.exports = (db) => {
    return {
        createCourse: async (options) =>{
            if(!options.title) throw new Error('Argument error: include title property');
            if(!options.user_id) throw new Error('Argument error: include user_id property');
            return await db.course.create({
                user_id: options.user_id,
                title: options.title,
                status: _resolveStatus('draft'),
                description: options.description || null
            });
        },
        updateTitle: async (id, title) => {
            const course = await db.course.findOne({
                where: {id}
            });
            return await course.update({title});
        },
        updateUser: async (id, user_id) => {
            const course = await db.course.findOne({
                where: {id}
            });
            return await course.update({user_id});
        },
        updateDescription: async (id, description) => {
            const course = await db.course.findOne({
                where: {id}
            });
            return await course.update({description});
        },
        updateStatus: async (id, status) => {
            status = _resolveStatus(status);
            const course = await db.course.findOne({
                where: {id}
            });
            return await course.update({status});
        },
        remove: async (id) => {
            const course = await db.findOne({where: {id}});
            return await course.destroy({force:true});
        },

        /*Function to get all courses
        * Takes in optional ids parameter  to only
        * get courses from a specific array of ids*/
        get: async (ids, page) => {
            let limit = 20;   // number of records per page
            page = page || 1;      // page number, default to 1
            const count = await db.course.findAndCountAll();
            let pages = Math.ceil(count / limit);
            let offset = limit * (page - 1);
            let query = {limit, offset};
            if(ids)query.where = {id: ids};
            const courses =  await db.course.findAll(query);
            return { pages, count, page, courses}
        }
    }
};

function _resolveStatus(status){
    status = status.toLowerCase();
    switch(status){
        case 'draft':
            return 1;

        case 'published':
            return 2;

        case 'archived':
            return 3;

        default:
            return 1;
    }
}