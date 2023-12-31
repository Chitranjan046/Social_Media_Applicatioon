const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config({path:'../config.env'});
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/users/auth/google/callback",
},

async function(accessToken, refreshToken, profile, done) {
    try {
        // find a user
        const user = await User.findOne({ email: profile.emails[0].value }).exec();

        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
            // if found, set this user as req.user
            return done(null, user);
        } else {
            // if not found, create the user and set it as req.user
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });

            return done(null, newUser);
        }
    } catch (err) {
        console.log('Error in google strategy-passport', err);
        return done(err); // Handle the error by passing it to the done callback
    }
}));

module.exports = passport;
