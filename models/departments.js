module.exports = function(sequelize, DataTypes) {
    const Departments = sequelize.define("departments", {
        dept_id: {
            type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        allowNull: false
        }
    })


    return Departments;
}
