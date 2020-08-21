const {Model}=require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class exercise extends Model {
        static associate(models) {
            models.exercise.belongsTo(models.workout)
            // define association here
          }
    }

    exercise.init({
        exerciseApiId: DataTypes.INTEGER,
        exerciseName: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.INTEGER,
        set: {
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
          }
    }, {
        sequelize,
        modelName: 'exercise',
    })

    return exercise
}
