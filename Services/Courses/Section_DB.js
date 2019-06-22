module.exports = (db) =>{
    return {
        create: async ({title, user_id}) =>{
            if(!title) throw new Error('arg error: title is required');
            if(!user_id) throw new Error('arg error: user_id is required');
            return db.section.create({
                title,
                user_id
            });
        },
        assign: async (section_id, course_id) => {

        },
        get: async (options) =>{
            if(options.id){
                return db.section.findOne({
                    where: { id: options.id },
                })
            }
        }
    }
};