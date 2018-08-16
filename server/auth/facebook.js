var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

passport.use(new FacebookStrategy({
  clientId: "",
  clientSecret: "",
  callbackURL: ""
},
  function(accessToken, refreshToken, profile, done){
    User.findOrCreate(
      {name: profile.displayName},
      {name: profile.displayName, userid: profile.id},
      function(err, user){
        if(err){
          return done(err)
        }
        done(null, user);
      })
  }
));

module.exports = passport;
