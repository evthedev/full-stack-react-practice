const express = require ('express');
const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20');
const keys = require ('./config/keys');

const app = express();

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        accessToken => {
            console.log(accessToken);
        }
    )
);

// set up route handler for '/auth/google
app.get(
    '/auth/google', // the route
    passport.authenticate( // Second argument tells the app to use passport.authenticate
        'google', //first argument is the strategy called ‘google’
        { scope: ['profile', 'email'] } // scope, or properties requested for permission
    )
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
