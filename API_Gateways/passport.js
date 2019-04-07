var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const User = require('../Services/Users/User_Service');

passport.use(new LocalStrategy(
    function(username, password, done) {

    }
));