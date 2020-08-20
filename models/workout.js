const {Model}=require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class workout extends Model {
        static associate(models) {
            // define association here
          }
    }

    workout.init({
        workoutId: DataTypes.INTEGER,
        exerciseName: DataTypes.STRING,
        set: DataTypes.INTEGER,
        repetitions: DataTypes.INTEGER,
        category: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'workout',
    })

    return workout
}
