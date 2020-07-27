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
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })


    return Departments;
}
