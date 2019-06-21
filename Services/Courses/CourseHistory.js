const versionFactory = historyDb => async (option) => {
    if (!historyDb.createHistory) throw new Error('arg error: no createHistory property on database handler');
    return historyDb.createHistory(option);
};

module.exports = {
    versionFactory,
};
