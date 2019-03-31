const {UsernameExists, EmailExists} = require('./User_DB');

async function ValidateUserExists(username, email){
    if(!username || !email) throw new Error('Invalid number of args passed. Please pass username and email');
    let valid_username = null;
    let valid_email = null;
    if(username){
        valid_username = await UsernameExists(username);
    }
    if(email){
        valid_email = await EmailExists(email);
    }

    if(valid_username && valid_email) return valid_username;

    return null;
}

module.exports = {
    ValidateUserExists
};