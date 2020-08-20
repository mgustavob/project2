'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.workout.belongsTo(models.user)
    }
  };
  workout.init({
    name: DataTypes.STRING,
    workoutId: DataTypes.INTEGER,
    exerciseName: DataTypes.STRING,
    set: {
      type: DataTypes.INTEGER,
      validate: {
      min: 1,
      max: 50
      }
    },
    repet: {
      type: DataTypes.INTEGER,
      validate: {
      min: 1,
      max: 50
      }
    },

    category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workout',
  });
  return workout;
};
