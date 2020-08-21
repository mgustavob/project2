let router = require('express').Router();
let db = require('../models');
const axios = require('axios');
const exercise = require('../models/exercise');

// let wLegs = new Map();
// let wArms = new Map();
// let wAbs = new Map();
// let wChest = new Map();
// let wBack = new Map();
// let wShoulders = new Map();
// const legs = [113, 191, 116, 154, 117, 118, 177, 130, 111];
// const arms = [88, 74, 81, 129, 82, 83, 84, 86, 138, 193, 195];
// const abs = [91, 125, 93, 176];
// const chest = [192, 97, 98, 100, 122, 163];
// const back = [109, 110, 181, 128, 143, 161, 106];
// const shoulders = [148, 119, 123, 152, 150, 151];

let urlArray = [ "https://wger.de/api/v2/exercise/?language=2","https://wger.de/api/v2/exerciseimage/", "https://wger.de/api/v2/exercisecategory/"] // unknown # of urls (1 or more)

let promiseArray = urlArray.map(url => axios.get(url)); // or whatever


router.get('/', (req, res)=> {

    axios.get(urlArray[2])
    // 0  is exercise, 1 is image
    .then(results => {
    //   console.log(results.data)
        let categories = results.data
        res.render('category', { categories})


    })
    .catch(err =>{
        console.log(err)
    })
})

router.get('/list/:id', (req, res)=>{
    console.log(req.params.id)
    let cat =req.params.id
    axios.get(`https://wger.de/api/v2/exercise/?language=2&category=${cat}&limit=1000`)
    .then(results =>{
        const exer = results.data.results

        // console.log(exer1)
        axios.get(`https://wger.de/api/v2/exerciseimage/?language=2&category=${cat}&limit=1000`)
        .then(resp => {
            const image = resp.data.results

            res.render('exercise', { exer, image })
        })
        .catch(err => {
            console.log(err);
        })

    })
    .catch(err => {
        console.log(err);
    })


    // axios.all(promiseArray)
        // // 0  is exercise, 1 is image
        // .then(function(results) {
        //   const exer = results.map(r => r.data);

})

module.exports = router;

//   for(let i = 0; i< exer[0].length; i++){
//     if (legs.includes(exer[0][i].id)) {
//       for (let k = 0; k < exer[1].length; k++) {
//         if ((exer[0][i].id == exer[1][k].exercise)) {

//           let wId = exer[0][i].id;
//           let wVal = wLegs.get(wId)
//           if (wVal) {

//             wVal["image"].push(exer[1][k].image);

//           } else {

//             let workout = {};
//             workout.id = exer[0][i].id;
//             workout.name = exer[0][i].name;
//             workout.image = [];
//             workout.description = exer[0][i].description;
//             workout.image.push(exer[1][k].image);
//             wLegs.set(exer[0][i].id, workout);
//             }
//           }
//         }
//       }
//     }
//     for(let i = 0; i< exer[0].length; i++){
//       if (arms.includes(exer[0][i].id)) {
//         for (let k = 0; k < exer[1].length; k++) {
//           if ((exer[0][i].id == exer[1][k].exercise)) {

//             let wId = exer[0][i].id;
//             let wVal = wLegs.get(wId)
//             if (wVal) {

//               wVal["image"].push(exer[1][k].image);

//             } else {

//               let workout = {};
//               workout.id = exer[0][i].id;
//               workout.name = exer[0][i].name;
//               workout.image = [];
//               workout.description = exer[0][i].description;
//               workout.image.push(exer[1][k].image);
//               wArms.set(exer[0][i].id, workout);
//               }
//             }
//           }
//         }
//       }

//   for(let i = 0; i< exer[0].length; i++){
//     if (abs.includes(exer[0][i].id)) {
//       for (let k = 0; k < exer[1].length; k++) {
//         if ((exer[0][i].id == exer[1][k].exercise)) {

//           let wId = exer[0][i].id;
//           let wVal = wLegs.get(wId)
//           if (wVal) {

//             wVal["image"].push(exer[1][k].image);

//           } else {

//             let workout = {};
//             workout.id = exer[0][i].id;
//             workout.name = exer[0][i].name;
//             workout.image = [];
//             workout.description = exer[0][i].description;
//             workout.image.push(exer[1][k].image);
//             wAbs.set(exer[0][i].id, workout);
//             }
//           }
//         }
//       }
//     }

//     for(let i = 0; i< exer[0].length; i++){
//       if (chest.includes(exer[0][i].id)) {
//         for (let k = 0; k < exer[1].length; k++) {
//           if ((exer[0][i].id == exer[1][k].exercise)) {

//             let wId = exer[0][i].id;
//             let wVal = wLegs.get(wId)
//             if (wVal) {

//               wVal["image"].push(exer[1][k].image);

//             } else {

//               let workout = {};
//               workout.id = exer[0][i].id;
//               workout.name = exer[0][i].name;
//               workout.image = [];
//               workout.description = exer[0][i].description;
//               workout.image.push(exer[1][k].image);
//               wChest.set(exer[0][i].id, workout);
//               }
//             }
//           }
//         }
//       }

//   for(let i = 0; i< exer[0].length; i++){
//     if (back.includes(exer[0][i].id)) {
//       for (let k = 0; k < exer[1].length; k++) {
//         if ((exer[0][i].id == exer[1][k].exercise)) {
//           let wId = exer[0][i].id;
//           let wVal = wLegs.get(wId)
//               if (wVal) {

//                 wVal["image"].push(exer[1][k].image);

//               } else {

//                 let workout = {};
//                 workout.id = exer[0][i].id;
//                 workout.name = exer[0][i].name;
//                 workout.image = [];
//                 workout.description = exer[0][i].description;
//                 workout.image.push(exer[1][k].image);
//                 wBack.set(exer[0][i].id, workout);
//                 }
//               }
//             }
//           }
//         }

//         for(let i = 0; i< exer[0].length; i++){
//           if (shoulders.includes(exer[0][i].id)) {
//             for (let k = 0; k < exer[1].length; k++) {
//               if ((exer[0][i].id == exer[1][k].exercise)) {

//                 let wId = exer[0][i].id;
//                 let wVal = wLegs.get(wId)
//                 if (wVal) {

//                   wVal["image"].push(exer[1][k].image);

//                 } else {

//                   let workout = {};
//                   workout.id = exer[0][i].id;
//                   workout.name = exer[0][i].name;
//                   workout.image = [];
//                   workout.description = exer[0][i].description;
//                   workout.image.push(exer[1][k].image);
//                   wShoulders.set(exer[0][i].id, workout);
//                   }
//                 }
//               }
//             }
//           }

//           console.log(wLegs(1));
        //   console.log(wArms);
        //   console.log(wAbs);
        //   console.log(wChest);
        //   console.log(wBack);
        //   console.log(wShoulders);
