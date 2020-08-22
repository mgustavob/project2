let router = require('express').Router();
let db = require('../models');
const axios = require('axios');
const exercise = require('../models/exercise');
const { route } = require('./auth');


// when creating a new workout it should ask name for the workout
//
router.get('/', (req, res) => {
    console.log(req.body);
    db.exercise.findOrCreate({
      where: { name: req.body.name },
      defaults: {
        name: req.body.name,
        set: req.body.set,
        repetition: req.body.repet,
        exerciseName: req.body.exercise,
      }
    })
    .then(([workout, created]) => {
      if (created) {
        // if created, success and redirect to home
        console.log(`${workout.name} was created`);

        // res.redirect('/');
      } else {
        // Email already exist
        console.log('Email already exist');
        // FLASH
        req.flash('Workout already exist. Please try again.');
        res.redirect('/exercise');
      }
    })
    .catch(error => {
      console.log('Error', error);
      req.flash(`Error, unfortunately... ${error}`);
      res.redirect('/exercise');
    });
  });

router.post('/workout', (req, res) => {
  db.workout.findAll()
  .then(response => {
    const workouts = response.data;
    res.render('/', { workouts })
  })
  .catch(err =>{
    console.log(err)
  })
})


  module.exports = router;
