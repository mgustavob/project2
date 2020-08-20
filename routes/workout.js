let router = require('express').Router();
let db = require('../models');
const axios = require('axios');
const exercise = require('../models/exercise');


// when creating a new workout it should ask name for the workout
//
