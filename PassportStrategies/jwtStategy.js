const passport = require('passport');
const User = require('../users/users.model');
const { Strategy, ExtractJwt } = require('passport-jwt');
passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        function(token, res) {
            User.findOne({_id: token.sub}, function(error, user) {
                if (error)  return res(error, false);
                if (user)   return res(null, {_id:user._id,role:user.role});
                return res(null, false);
            });
        }
    )
);
module.exports = passport;