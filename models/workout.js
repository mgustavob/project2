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
      models.workout.belongsTo(models.user)
      models.workout.hasMany(models.exercise)

      // define association here
    }
  };
  workout.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'workout',
  });
  return workout;
};
