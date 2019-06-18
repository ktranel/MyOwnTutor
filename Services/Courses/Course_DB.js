module.exports = (db) => {
    return {
        CreateCourse: async (options) =>{
            if(!options.title) throw new Error('Argument error: include title property');
            if(!options.user_id) throw new Error('Argument error: include user_id property');
            return await db.course.create({
                user_id: options.user_id,
                title: options.title,
                status: _ResolveStatus('draft'),
                description: options.description || null
            });
        },
        UpdateTitle: async (id, title) => {
            const course = await db.course.findOne({
                where: {id}
            });
            return await course.update({title});
        },
        UpdateUser: async (id, user_id) => {
            const course = await db.course.findOne({
                where: {id}
            });
            return await course.update({user_id});
        },
        UpdateDescription: async (id, description) => {
            const course = await db.course.findOne({
                where: {id}
            });
            return await course.update({description});
        },
        UpdateStatus: async (id, status) => {
            status = _ResolveStatus(status);
            const course = await db.course.findOne({
                where: {id}
            });
            return await course.update({status});
        },
        Remove: async (id) => {
            const course = await db.findOne({where: {id}});
            return await course.destroy({force:true});
        }
    }
};

function _ResolveStatus(status){
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