const {UsernameExists,
            EmailExists,
            CreateUser,
            FindUser} = require('./User_DB');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    if(args.password){
        args.password = await _Encrypt(args.password);
    }
    return await CreateUser(args)
}

async function UserSearch(credential){
    return FindUser(credential);
}



module.exports = {
    ValidateUserExists,
    CreateNewUser,
    UserSearch
};

async function _Encrypt(text){
    return await bcrypt.hash(text, saltRounds);
}