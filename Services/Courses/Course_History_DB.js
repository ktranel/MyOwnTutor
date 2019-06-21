module.exports = (db) => {
    return {
        createHistory: async (options) => {
            if(!options.user_id) throw new Error('Argument Error: options.user_id required');
            if(!options.course_id) throw new Error('Argument Error: options.course_id required');
            return await db.course_history.create({
                user_id: options.user_id,
                course_id: options.course_id,
                title: options.title,
                description: options.description || null,
                status: _resolveStatus(options.status),
                version: 1
            })
        },
        latest: async (course_id) => {
            const courses =  await db.course_history.findAll({
                where: {course_id},
                limit: 1,
                order:[ ['created_at', 'DESC']]
            });
            if(courses.length > 0) return courses[0];
            return null;
        }
    }
};

function _resolveStatus(status){
    if(typeof status === "string") status = status.toLowerCase();
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