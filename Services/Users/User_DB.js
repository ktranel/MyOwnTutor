const db = require('../../models');

/*
Function checks if username already exists in database.
Returns user if username already taken, false otherwise.
 */
async function UsernameExists(username){
    if(username === null || username === undefined) throw new Error('No username was passed as an argument');

    const user = await db.user.findOne({
        where : {username}
    });

    if(user) return user;

    return null;
}

/*
Function checks if emails already exists in database.
Return user if email already taken, false otherwise.
 */
async function EmailExists(email){
    if(email === null || email === undefined) throw new Error('No email was passed as an argument');

    const user = await db.user.findOne({
        where : {email}
    });

    if(user) return user;

    return null;
}

async function CreateUser(args){
    if(!args.username) throw new Error('Invalid argument: username');
    if(!args.first_name) throw new Error('Invalid argument: first_name');
    if(!args.last_name) throw new Error('Invalid argument: last_name');
    if(!args.password) throw new Error('Invalid argument: password');
    if(!args.email) throw new Error('Invalid argument: email');
    if(!args.permission_id) args.permission_id = 2;

    const user = await db.user.create({
        first_name: args.first_name,
        last_name: args.last_name,
        username: args.username,
        password: args.password,
        email: args.email,
        permission_id: args.permission_id
    });

    return user;
}

module.exports = {
    UsernameExists,
    EmailExists,
    CreateUser
};