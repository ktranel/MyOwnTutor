const lookupFactory = courseDb => async function (option) {
    if (!courseDb.lookup) throw new Error('arg error: no lookup property on database handler');
    return courseDb.lookup({ title: option.title });
};

const createFactory = courseDb => async (option) => {
    if (!courseDb.createCourse) throw new Error('arg error: no createCourse property on database handler');
    if (!option.title) throw new Error('arg error: option.title cannot be undefined');
    const settings = option;
    settings.status = 'draft';
    return courseDb.createCourse(settings);
};

module.exports = {
    lookupFactory,
    createFactory,
};
