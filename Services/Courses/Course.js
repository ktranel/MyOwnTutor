module.exports = (courseDb) => {
    return {
        create: async (option) => {
            if (!courseDb.createCourse) throw new Error('arg error: no createCourse property on database handler');
            if (!option.title) throw new Error('arg error: option.title cannot be undefined');
            const settings = option;
            settings.status = 'draft';
            return courseDb.createCourse(settings);
        },
        lookup: async (option) => {
            if (!courseDb.lookup) throw new Error('arg error: no lookup property on database handler');
            if (!option.id && !option.title) throw new Error('Invalid arg: either option.id or option.title must be valid');
            return courseDb.lookup({ id: option.id, title: option.title });
        },
    };
};
