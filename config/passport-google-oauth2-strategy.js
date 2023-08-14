const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User= require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"256246325715-p7rlioenark1ak4l8ir88ervelsjevlm.apps.googleusercontent.com",
        clientSecret:"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",
        calllback:"http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile,done){
        //find the user 
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in the google-strategy passport', err); return;}

            console.log(profile);
            if(user){
                // if found set these user as req.user
                return done(null,user);
            }else{
                // if not found, create the user and set it as req.user(sign in the user)
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err, user){
                    if(err){console.log('error in the creating user google-strategy passport', err); return;}

                    return done(null,user);
                })
            }

        });
    }
));

module.exports= passport;