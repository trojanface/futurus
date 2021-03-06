module.exports = function (sequelize, DataTypes) {
    const Products = sequelize.define("products", {
        prod_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        department: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stockCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        iconPath: {
            type: DataTypes.STRING
        },
        upsell: {
            type: DataTypes.STRING
        }
    })


    return Products;
}
