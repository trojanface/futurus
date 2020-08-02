const db = require("../models");
const { sequelize } = require("../models");

// Defining methods for the userController
module.exports = {
  create: function(req, res) {
    if (req.user) {
      return sequelize.transaction(function (dbTransaction){
        return  db.transactions
        .create(req.body, {transaction: dbTransaction})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      })
   
  }}
};
