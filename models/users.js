var bcrypt = require("bcryptjs");
// let passport = require("../config/passport.js");


module.exports = function(sequelize, DataTypes) {
    const Users = sequelize.define("users", {
        user_id: {
            type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
        allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
        allowNull: false
        },
        password: {
            type: DataTypes.STRING,
        allowNull: false
        },
        adminLevel: {
            type: DataTypes.INTEGER,
        allowNull: false
        }
    })

    Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// before a User is created, their password will be automatically hash their password
    Users.addHook("beforeCreate", function(users) {
    users.password = bcrypt.hashSync(users.password, bcrypt.genSaltSync(10), null);
    });
    //     Users.associate = models => {
    //     Users.hasMany(models.orders, {
    //         onDelete: "cascade"
    //     })
    // }

    return Users;
}
