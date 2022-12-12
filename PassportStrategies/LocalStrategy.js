const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../users/users.model');
const usersService = require('../users/users.service');

passport.use(new LocalStrategy(
    function(username, password, res) {
        User.findOne({ username }, async function (error, user) {
            if (error) { return res(error); }
            if (!user) {
                console.log("Error 404");
                return res(null, false);
            }
            if (!await usersService.MatchUser(username, password)) {
                console.log("Error 403");
                return res(null, false);
            }
            return res(null, user);
        });
    }
));
module.exports = passport