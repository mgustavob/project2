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
    set: DataTypes.INTEGER,
  //   validate: {
  //     len: {
  //       args: [1, 99],
  //       msg: 'Name must be 1 to 99 characters'
  //     }
  // },
    repet: DataTypes.INTEGER,
  //   validate: {
  //     len: {
  //       args: [1, 99],
  //       msg: 'Name must be 1 to 99 characters'
  //     }
  // },
    category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'workout',
  });
  return workout;
};
