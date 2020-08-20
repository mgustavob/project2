const {Model}=require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class exercise extends Model {
        static associate(models) {
            // define association here
          }
    }

    exercise.init({
        exerciseApiId: DataTypes.INTEGER,
        exerciseName: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'exercise',
    })

    return exercise
}
