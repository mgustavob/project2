# Project 2

## Workout Bot

This is the second project for GA

Requires:

* User Log in
* Modules, Routes
* API
* Create, Add, Modify and Delete items from Data Base

## User Experience

The user will log in and be able to create a Workout and add exercises based on an API call

### Main Challege

There was a lot of bad information on the API, a lot of repeat exercise, exercise name that had a persons name and no info or pictures, bad data, etc

So i decided to use only data that had an image to its name, I used the code below to create the list of exercises that I wanted


``` javascript

  for (let i = 0; i < exer[0].length; i++) {
    // if (exer[1]) {

      if (exer[0][i].category == 9) {
      // console.log(`name: ${exer[0][i].name}💃🏻ID: ${exer[0][i].id}`);

        for (let j = 0; j<exer[1].length; j++) {
          if (exer[1][j].exercise == exer[0][i].id) {
            console.log(`name: ${exer[0][i].name}💃🏻ID: ${exer[0][i].id} 🙈Image:${exer[1][j].image}`);
            total += 1;
          }
        }
  }}
  console.log(total)

```
