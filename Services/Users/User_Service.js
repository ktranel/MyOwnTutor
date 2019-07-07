const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (dbHandler) => {
    function _Encrypt(text){
        return bcrypt.hash(text, saltRounds);
    }
    return {
        validateUser: async (username, email) => {
            if(!username || !email) throw new Error('Invalid number of args passed. Please pass username and email');
            let taken_valid_username = null;
            let taken_valid_email = null;
            if(username){
                taken_valid_username = await dbHandler.UsernameExists(username);
            }
            if(email){
                taken_valid_email = await dbHandler.EmailExists(email);
            }

            if(taken_valid_username) return taken_valid_username;
            if(taken_valid_email) return taken_valid_email;

            return null;
        },
        createUser: async (args) => {
            if(args.password){
                args.password = await _Encrypt(args.password);
            }
            return await dbHandler.CreateUser(args);
        },
        userSearch: async (credential) => {
            return dbHandler.FindUser(credential);
        },
    };
};
