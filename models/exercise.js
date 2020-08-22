'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.exercise.belongsTo(models.workout)
      // define association here
    }
  };
  exercise.init({
    exerciseApiId: DataTypes.INTEGER,
    exerciseName: DataTypes.STRING,
    sets: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 50
      }
    },
    repetition: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 50
      }
    },
    workoutId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'exercise',
  });
  return exercise;
};
