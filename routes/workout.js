let router = require('express').Router();
let db = require('../models');
const axios = require('axios');
let methodOverride = require('method-override');
// router.use(methodOverride('_method'));

let urlArray = [ "https://wger.de/api/v2/exercise/?language=2","https://wger.de/api/v2/exerciseimage/", "https://wger.de/api/v2/exercisecategory/"] // unknown # of urls (1 or more)

let promiseArray = urlArray.map(url => axios.get(url)); // or whatever


// when creating a new workout it should ask name for the workout
//

router.get('/', (req, res) => {
    // console.log(req.body);
    db.workout.findAll({
      where: { userId: req.user.id },
      include: [ db.user, db.exercise]
    })
    .then(workouts => {
      res.render('workout', { workouts })
    })
    .catch(error => {
      console.log('Error', error);
    });
  });

router.post('/', (req, res) => {
    db.workout.findOrCreate({
      where: {
        name: req.body.name,
        userId: req.user.id,
        description: req.body.description
      },
      include: [ db.user, db.exercise ]
    })
    .then(workout =>{
      console.log('This is the workout : ', workout[0].id)
      res.redirect(`/workout/${workout[0].id}` )
    })
    .catch(err => {
      console.log(err)
    })
})


////////////////////////////////////////////
// EXERCISE ROUTES
///////////////////////////////////////////

router.get('/:id', (req, res)=> {
    let workoutId = req.params.id;
    console.log('Crazy Id: ', workoutId)
    axios.get(urlArray[2])
    // 0  is exercise, 1 is image
    .then(results => {
    //   console.log(results.data)
        let categories = results.data
        res.render('category', { categories, workoutId })


    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/:id/category', (req, res)=>{
    let workoutId = req.params.id;
    let cat = req.body.categoryId;
    console.log('workoutId: ', workoutId)
    console.log('category Id: ', cat)
    axios.get(`https://wger.de/api/v2/exercise/?language=2&category=${cat}&limit=1000`)
    .then(results =>{
        const exer = results.data.results

        // console.log(exer1)
        axios.get(`https://wger.de/api/v2/exerciseimage/?language=2&category=${cat}&limit=1000`)
        .then(resp => {
            const image = resp.data.results

            res.render('exercise', { exer, image, workoutId })
        })
        .catch(err => {
            console.log(err);
        })

    })
    .catch(err => {
        console.log(err);
    })
})

router.post('/:id', (req, res) => {

    console.log('Workout ID LAST: ',req.params.id);
    db.exercise.findOrCreate({
      where: {
        exerciseApiId: req.body.exerciseApiId,
        sets: req.body.sets,
        repetition: req.body.repetition,
        exerciseName: req.body.exerciseName,
        workoutId: req.params.id
      }
    })
    .then(exercise => {
      console.log(exercise)
      res.redirect('/workout');
    })
    .catch(error => {
      console.log('Error', error);
    });
  });

  router.delete('/:id', (req, res) => {
    let wId = req.params.id;
    // console.log('🤦🏻‍♀️🤦🏻‍♀️',wId);
    db.workout.destroy({
      where: { id: wId }
    })
    .then(()=> {
      db.workout.findAll({
        where: { userId: req.user.id },
        include: [ db.user, db.exercise]
      })
      .then(workouts => {
        res.render('workout', { workouts })
      })
      .catch(err =>{
        console.log(err);
      })
    })
      .catch(err =>{
        console.log(err);
    })
  })

router.get('/details/:id/:name', (req, res) =>{
  // let wId = req.params.id;
  let wName = req.params.name;
  // console.log('🤦🏻‍♀️🤦🏻‍♀️',wId);
  db.exercise.findAll({
    where: { workoutId: req.params.id }})
  .then(workout => {
    // console.log('🤦🏻‍♀️🤦🏻‍♀️', workout[1].dataValues.exerciseName);
      res.render('details', { workout, wName });
    })
    .catch(err => {
      console.log(err);
    })
  })



router.put('/details/:id/:name', (req, res) =>{
  let wName = req.body.wName;
  db.exercise.update({
      sets: req.body.sets,
      repetition: req.body.repetition
    }, {
      where: { id: req.body.exerciseId }
    }
  )
  .then(exercise =>{
    // console.log('🐽🐽',exercise)
    db.exercise.findAll({
      where: { workoutId: req.params.id }})
      .then(workout => {
          res.render('details', { workout, wName });
        })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
})




  module.exports = router;
