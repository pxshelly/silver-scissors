const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { getApptsByDate, getAppt, makeAppt, editAppt } = require('./controllers');
const { setUpPassport, isLoggedIn, shouldSendIndex } = require('./passport');
const subdomain = require('express-subdomain');
const router = express.Router();

setUpPassport();

// middleware
app.use(subdomain('admin', express.Router()
  .use(express.static(path.join(__dirname, '../dist/')))
  .use('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
));
app.use(express.static(path.join(__dirname, '../dist/')));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'keyboard cat', cookie: {
    maxAge: 3600000
  }
}))
app.use(passport.initialize());
app.use(passport.session());

// facebook endpoints
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000/login'
  }));

app.get('/login-status', function(req,res) {
  res.send({loggedIn: req.isAuthenticated()});
})

app.get('/logout', function (req, res) {
  req.logout();
  res.clearCookie('connect.sid', { path: '/' });
  res.redirect('http://localhost:3000/logged-out');
});

// app endpoints
app.get('/schedule/:date', isLoggedIn, getApptsByDate);
app.get('/appointments', isLoggedIn, getAppt);

app.post('/appointments', makeAppt);
app.put('/appointments', isLoggedIn, editAppt);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log(`Server listening on ${port}`));