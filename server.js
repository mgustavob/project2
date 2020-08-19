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



let wLegs = new Map();
let wArms = new Map();
let wAbs = new Map();
let wChest = new Map();
let wBack = new Map();
let wShoulders = new Map();
const legs = [113, 191, 116, 154, 117, 118, 177, 130, 111];
const arms = [88, 74, 81, 129, 82, 83, 84, 86, 138, 193, 195];
const abs = [91, 125, 93, 176];
const chest = [192, 97, 98, 100, 122, 163];
const back = [109, 110, 181, 128, 143, 161, 106];
const shoulders = [148, 119, 123, 152, 150, 151];






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
  let urlArray = [ "https://wger.de/api/v2/exercise/?language=2","https://wger.de/api/v2/exerciseimage/" ] // unknown # of urls (1 or more)

  let promiseArray = urlArray.map(url => axios.get(url)); // or whatever
  axios.all(promiseArray)
  // 0  is exercise, 1 is image
  .then(function(results) {
    const exer = results.map(r => r.data);
    for(let i = 0; i< exer[0].length; i++){
      if (legs.includes(exer[0][i].id)) {
        for (let k = 0; k < exer[1].length; k++) {
          if ((exer[0][i].id == exer[1][k].exercise)) {

            let wId = exer[0][i].id;
            let wVal = wLegs.get(wId)
            if (wVal) {

              wVal["image"].push(exer[1][k].image);

            } else {

              let workout = {};
              workout.id = exer[0][i].id;
              workout.name = exer[0][i].name;
              workout.image = [];
              workout.description = exer[0][i].description;
              workout.image.push(exer[1][k].image);
              wLegs.set(exer[0][i].id, workout);
              }
            }
          }
        }
      }
      for(let i = 0; i< exer[0].length; i++){
        if (arms.includes(exer[0][i].id)) {
          for (let k = 0; k < exer[1].length; k++) {
            if ((exer[0][i].id == exer[1][k].exercise)) {

              let wId = exer[0][i].id;
              let wVal = wLegs.get(wId)
              if (wVal) {

                wVal["image"].push(exer[1][k].image);

              } else {

                let workout = {};
                workout.id = exer[0][i].id;
                workout.name = exer[0][i].name;
                workout.image = [];
                workout.description = exer[0][i].description;
                workout.image.push(exer[1][k].image);
                wArms.set(exer[0][i].id, workout);
                }
              }
            }
          }
        }

    for(let i = 0; i< exer[0].length; i++){
      if (abs.includes(exer[0][i].id)) {
        for (let k = 0; k < exer[1].length; k++) {
          if ((exer[0][i].id == exer[1][k].exercise)) {

            let wId = exer[0][i].id;
            let wVal = wLegs.get(wId)
            if (wVal) {

              wVal["image"].push(exer[1][k].image);

            } else {

              let workout = {};
              workout.id = exer[0][i].id;
              workout.name = exer[0][i].name;
              workout.image = [];
              workout.description = exer[0][i].description;
              workout.image.push(exer[1][k].image);
              wAbs.set(exer[0][i].id, workout);
              }
            }
          }
        }
      }

      for(let i = 0; i< exer[0].length; i++){
        if (chest.includes(exer[0][i].id)) {
          for (let k = 0; k < exer[1].length; k++) {
            if ((exer[0][i].id == exer[1][k].exercise)) {

              let wId = exer[0][i].id;
              let wVal = wLegs.get(wId)
              if (wVal) {

                wVal["image"].push(exer[1][k].image);

              } else {

                let workout = {};
                workout.id = exer[0][i].id;
                workout.name = exer[0][i].name;
                workout.image = [];
                workout.description = exer[0][i].description;
                workout.image.push(exer[1][k].image);
                wChest.set(exer[0][i].id, workout);
                }
              }
            }
          }
        }

    for(let i = 0; i< exer[0].length; i++){
      if (back.includes(exer[0][i].id)) {
        for (let k = 0; k < exer[1].length; k++) {
          if ((exer[0][i].id == exer[1][k].exercise)) {
            let wId = exer[0][i].id;
            let wVal = wLegs.get(wId)
                if (wVal) {

                  wVal["image"].push(exer[1][k].image);

                } else {

                  let workout = {};
                  workout.id = exer[0][i].id;
                  workout.name = exer[0][i].name;
                  workout.image = [];
                  workout.description = exer[0][i].description;
                  workout.image.push(exer[1][k].image);
                  wBack.set(exer[0][i].id, workout);
                  }
                }
              }
            }
          }

          for(let i = 0; i< exer[0].length; i++){
            if (shoulders.includes(exer[0][i].id)) {
              for (let k = 0; k < exer[1].length; k++) {
                if ((exer[0][i].id == exer[1][k].exercise)) {

                  let wId = exer[0][i].id;
                  let wVal = wLegs.get(wId)
                  if (wVal) {

                    wVal["image"].push(exer[1][k].image);

                  } else {

                    let workout = {};
                    workout.id = exer[0][i].id;
                    workout.name = exer[0][i].name;
                    workout.image = [];
                    workout.description = exer[0][i].description;
                    workout.image.push(exer[1][k].image);
                    wShoulders.set(exer[0][i].id, workout);
                    }
                  }
                }
              }
            }

            // console.log(wLegs);
            // console.log(wArms);
            // console.log(wAbs);
            // console.log(wChest);
            // console.log(wBack);
            // console.log(wShoulders);




  })
  res.render('index', { alerts: req.flash(),  wLegs });
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));

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
