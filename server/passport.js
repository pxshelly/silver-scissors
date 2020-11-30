const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || require('./config').FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || require('./config').FACEBOOK_APP_SECRET;
const { retrieveUserById, createUser } = require('./models');
const { SERVER_URL } = require('../client/src/constants');

const setUpPassport = () => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    retrieveUserById(id)
      .then(result => {
        done(null, { id: id });
      })
      .catch(error => {
        done(error);
      })
  });

  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `${SERVER_URL}/auth/facebook/callback`
  },
    function (accessToken, refreshToken, profile, done) {
      retrieveUserById(profile.id)
        .then(result => {
          if (!result.length) {
            createUser({
              fb_id: profile.id,
              fb_access_token: accessToken,
              user_name: profile.displayName
            })
              .then(result => {
                done(null, result.rows[0])
              })
              .catch(error => done(error));
          } else {
            done(null, result[0]);
          }
        })
        .catch(error => {
          done(error);
        });
    }
  ));
}

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(302).send({ redirect: `${SERVER_URL}/login` });
};

const shouldSendIndex = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect(`${SERVER_URL}/login`);
};

module.exports = { setUpPassport, isLoggedIn, shouldSendIndex};