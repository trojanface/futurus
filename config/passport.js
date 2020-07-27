let passport = require("passport");//imports passport
let LocalStrategy = require("passport-local").Strategy;//assigns a authentication 'strategy' to this class variable
let db = require("../models");//import databases

passport.use(new LocalStrategy(//new instance of a passport strategy
    {
        usernameField: "username", //configured to use username
        passwordField: "password"
    },
    function (usr, password, done) { //when signing in this code runs
        console.log("checking user")
        db.users.findOne({
            where: {
                username: usr//finds user in database
            }
        }).then(function (dbUser) {
            if (!dbUser) {//if it cant find user then it returns below
                console.log("Invalid User")
                return done(null, false);
            }
            else if (!dbUser.validPassword(password)) { //if password doesn't match then responds below

                console.log("Invalid Password")
                return done(null, false);

            }
            return done(null, dbUser); //if no errors occur it completes
        });
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);//serialized the user to transfer across http requests
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);//same as above only reverses serialisation
});

module.exports = passport; //exports it