# Project 2

## Workout Bot

This is the second project for GA

Requires:

* User Log in
* Modules, Routes
* API
* Create, Add, Modify and Delete items from Data Base

## User Experience

1. The user will log in and be able to create a Workout
2. After than he will be able to add exercises based on a category
3. Add that exercise with sets, and repetitions
4. User will be able to modify sets and repetitions on the website
5. User will be able to delete the workout

### Main Challege

There was a lot of bad information on the API, a lot of repeat exercise, exercise name that had a persons name and no info or pictures, bad data, etc

So i decided to use only data that had an image to its name, I used the code below to create the list of exercises that I wanted


``` javascript

  for (let i = 0; i < exer[0].length; i++) {
      if (exer[0][i].category == 9) {
        for (let j = 0; j<exer[1].length; j++) {
          if (exer[1][j].exercise == exer[0][i].id) {
            console.log(`name: ${exer[0][i].name}💃🏻ID: ${exer[0][i].id} 🙈Image:${exer[1][j].image}`);
          }
        }
  }}
  console.log(total)

```

This is how I took each exercise that has an image per category
