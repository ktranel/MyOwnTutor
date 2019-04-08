var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../Services/Users/User_Service');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.UserSearch(id)
        .then(user=>done(null, user));
});

passport.use(new LocalStrategy(
    function(username, password, done){
        User.UserSearch(username)
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