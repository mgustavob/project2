require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const axios = require('axios');

// require the authorization middleware at the top of the page
const isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);










// secret: What we actually giving the user to use our site / session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: if we have a new session, we'll save it, therefore,
// setting this to true


app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

// Initialize passport and run session as middleware
app.use(passport.initialize());
app.use(passport.session());

// flash for temporary messages to the user
app.use(flash());

// middleware to have our message accessible for every view
app.use((req, res, next) => {
  // before every route, we will attached our current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
    res.render('index', { alerts: req.flash() });
  });




app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

// app.get('/exercise', (req, res) => {
//   axios.get('https://wger.de/api/v2/exercise/?language=2')
//   .then(resp => {
//     let exercise = resp.data;
//     let category = req.query.category;
//     console.log(category);
// })
// })

app.use('/auth', require('./routes/auth'));
app.use('/exercise', require('./routes/exercise'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;


// this is the code I used to find the arrays for legs, arms, chest, etc
  // for (let i = 0; i < exer[0].length; i++) {
  //   // if (exer[1]) {

  //     if (exer[0][i].category == 9) {
  //     // console.log(`name: ${exer[0][i].name}💃🏻ID: ${exer[0][i].id}`);

  //       for (let j = 0; j<exer[1].length; j++) {
  //         if (exer[1][j].exercise == exer[0][i].id) {
  //           console.log(`name: ${exer[0][i].name}💃🏻ID: ${exer[0][i].id} 🙈Image:${exer[1][j].image}`);
  //           total += 1;
  //         }
  //       }

  // // }
  // }}
  // console.log(total)
