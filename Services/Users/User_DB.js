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

module.exports = {
    UsernameExists,
    EmailExists,
};