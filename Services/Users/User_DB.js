module.exports = (db) => {
    const { Op } = db.Sequelize;
    return {
        /*
Function checks if username already exists in database.
Returns user if username already taken, false otherwise.
 */
        async UsernameExists(username) {
            if (username === null || username === undefined) throw new Error('No username was passed as an argument');

            const user = await db.user.findOne({
                where: { username },
            });

            if (user) return user;

            return null;
        },

        /*
        Fuction for finding a user based on their user id.
        @args
        - user_id : string

        @returns user object
         */
        async FindUser(credential) {
            if (!credential) throw new Error('Invalid argument: credential');
            const user = await db.user.findOne({
                where: {
                    [Op.or]: [
                        { username: credential },
                        { id: credential },
                    ],
                },
            });

            if (user) return user;

            return null;
        },

        /*
        Function checks if emails already exists in database.
        Return user if email already taken, false otherwise.
         */
        async EmailExists(email) {
            if (email === null || email === undefined) throw new Error('No email was passed as an argument');

            const user = await db.user.findOne({
                where: { email },
            });

            if (user) return user;

            return null;
        },

        async CreateUser(args) {
            if (!args.username) throw new Error('Invalid argument: username');
            if (!args.first_name) throw new Error('Invalid argument: first_name');
            if (!args.last_name) throw new Error('Invalid argument: last_name');
            if (!args.password) throw new Error('Invalid argument: password');
            if (!args.email) throw new Error('Invalid argument: email');
            if (!args.permission_id) args.permission_id = 2;

            const permissions = await _ValidatePermissionId(args.permission_id);
            if (!permissions) throw new Error('Invalid argument: permission_id not found');

            const user = await db.user.create({
                first_name: args.first_name,
                last_name: args.last_name,
                username: args.username,
                password: args.password,
                email: args.email,
                permission_id: args.permission_id,
            });

            return user;
        },
    };
};

const db = require('../../models');

async function _ValidatePermissionId(permission_id) {
    const permissions = await db.permission.findOne({
        where: { id: permission_id },
    });

    if (permissions) return permissions;

    return null;
}
