const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const { getApptsByDate, getAppt, makeAppt, editAppt, removeAppt } = require('./controllers');
const { setUpPassport, isLoggedIn } = require('./passport');

setUpPassport();

// middleware
app.use(express.static(path.join(__dirname, '../dist/')));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))
app.use(passport.initialize());
app.use(passport.session());

// facebook endpoints
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

// app endpoints
app.get('/schedule/:date', getApptsByDate);
app.get('/appointments', getAppt);

app.post('/appointments', makeAppt);
app.put('/appointments', editAppt);
app.delete('/appointment/:id', removeAppt);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log(`Server listening on ${port}`));