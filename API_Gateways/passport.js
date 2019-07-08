var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const userService = require('../Services/Users/User_Service');
const db = require('../models');
const User_DB = require('../Services/Users/User_DB');
const user_db_handler = User_DB(db);
const User = userService(user_db_handler);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.userSearch(id)
        .then(user=>done(null, user));
});

passport.use(new LocalStrategy(
    function(username, password, done){
        User.userSearch(username)
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