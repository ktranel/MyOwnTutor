
const User = require('../Services/Users/User_Service');
const db = require('../models');
const UserDb = require('../Services/Users/User_DB');

// function creation
const userDbHandler = UserDb(db);
const UserSearch = User.UserSearchFactory(userDbHandler);
// each request that comes through will have a req.user if the user is logged in
module.exports = (req, res, next) => {
    const userId = req.user ? req.user.id : null;
    if (userId) {
        UserSearch(userId)
            .then((user) => {
                if (user) {
                    req.user_permission = user.permission_id;
                }
                next();
            });
    } else {
        next();
    }
};
