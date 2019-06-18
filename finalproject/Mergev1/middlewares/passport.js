var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var userModel = require('../models/user.model');
var adminModel = require('../models/admin.model');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  var ls = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    userModel.singleByUserName(username).then(rows => {
      if (rows.length === 0) {
        return done(null, false, { message: 'Invalid username.' });
      }
      
      if(rows[0].length != 0) {
        var user = rows[0][0];
        var ret = bcrypt.compareSync(password,user.PASSWORD);
        
        if (ret) {
          return done(null, user);
        }
        return done(null, false, { message: 'Invalid password.' });
      }
      else {
        var user = rows[1][0];
        if(user.userPassword === password){
          return done(null, user);
        }
        return done(null, false, { message: 'Invalid password.' });
      }



        
      
    }).catch(err => {
      return done(err, false);
    });  

  });

  passport.use(ls);

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}