module.exports = (dbHandler) => {
    return {
        createHistory: async (option) => {
            if (!dbHandler.createHistory) throw new Error('arg error: no createHistory property on database handler');
            return dbHandler.createHistory(option);
        },
    };
};
