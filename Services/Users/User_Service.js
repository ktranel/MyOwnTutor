const bcrypt = require('bcrypt');
const saltRounds = 10;

function ValidateUserExistsFacotry(UserDB){
    return async function(username, email){
        if(!username || !email) throw new Error('Invalid number of args passed. Please pass username and email');
        let taken_valid_username = null;
        let taken_valid_email = null;
        if(username){
            taken_valid_username = await UserDB.UsernameExists(username);
        }
        if(email){
            taken_valid_email = await UserDB.EmailExists(email);
        }

        if(taken_valid_username) return taken_valid_username;
        if(taken_valid_email) return taken_valid_email;

        return null;
    }
}

function CreateUserFactory(UserDB){
    return async function(args){
        if(args.password){
            args.password = await _Encrypt(args.password);
        }
        return await UserDB.CreateUser(args);
    }
}

function UserSearchFactory(UserDB){
    return async function(credential){
        return UserDB.FindUser(credential);
    }
}


module.exports = {
    ValidateUserExistsFacotry,
    CreateUserFactory,
    UserSearchFactory
};

async function _Encrypt(text){
    return await bcrypt.hash(text, saltRounds);
}