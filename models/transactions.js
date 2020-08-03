module.exports = function (sequelize, DataTypes) {
    const Transactions = sequelize.define("transactions", {
        trans_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        transItems: {
            type: DataTypes.STRING
        },
        transValue: {
            type: DataTypes.INTEGER
        }
    })


    return Transactions;
}
