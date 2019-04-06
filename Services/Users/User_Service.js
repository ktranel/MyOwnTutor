const {UsernameExists,
            EmailExists,
            CreateUser} = require('./User_DB');

async function ValidateUserExists(username, email){
    if(!username || !email) throw new Error('Invalid number of args passed. Please pass username and email');
    let taken_valid_username = null;
    let taken_valid_email = null;
    if(username){
        taken_valid_username = await UsernameExists(username);
    }
    if(email){
        taken_valid_email = await EmailExists(email);
    }

    if(taken_valid_username) return taken_valid_username;
    if(taken_valid_email) return taken_valid_email;

    return null;
}

async function CreateNewUser(args){
    return await CreateUser(args)
}

module.exports = {
    ValidateUserExists,
    CreateNewUser
};