const passport = require('passport');
const usersService = require('../users/users.service');
const { Strategy, ExtractJwt } = require('passport-jwt');
passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function(token, res) {
            User.findOne({_id: token.sub}, function(error, user) {
                if (error)  return res(error, false);
                if (user)   return res(null, user._id);
                return res(null, false);
            });
        }
    )
);
module.exports = passport;