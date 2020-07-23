module.exports = function(sequelize, DataTypes) {
    const Inventory = sequelize.define("inventory", {
        inv_id: {
            type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        productType: {
            type: DataTypes.INTEGER,
        allowNull: false
        },
        transactionNum: {
            type: DataTypes.INTEGER
        }
    })


    return Inventory;
}
