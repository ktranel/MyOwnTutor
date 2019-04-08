const User = require('../Services/Users/User_Service');
// each request that comes through will have a req.user if the user is logged in
module.exports = (req, res, next)=>{
    const user_id = req.user ? req.user.id : null;
    if(user_id){
        User.UserSearch(user_id)
            .then(user=>{
               if(user){
                   req.user_permission = user.permission_id
               }
               next();
            });
    }else{
        next();
    }
};