var passport=require('passport');
var localStrategy = require('passport-local').Strategy;
module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());

    ls= new localStrategy();
    passport.use(ls);

    passport.serializeUser((user,done)=>{
        return(null,user);
    });

    passport.deserializeUser((user,done)=>{
        return(null,user);
    });
}