var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../Services/Users/User_Service');
const db = require('../models');
const User_DB = require('../Services/Users/User_DB');
const user_db_handler = User_DB(db);

//function creation
const UserSearch = User.UserSearchFactory(user_db_handler);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserSearch(id)
        .then(user=>done(null, user));
});

passport.use(new LocalStrategy(
    function(username, password, done){
        UserSearch(username)
            .then(user=>{
                 bcrypt.compare(password, user.password)
                     .then(match=>{
                         if(match) return done(null, user);
                         return done(null, false);
                     })

            })
            .catch(e=>done(e));
    }

));