const db = require("../models");
const { sequelize } = require("../models");

// Defining methods for the transController
module.exports = {
  create: function(req, res) {
    if (req.user) {//checking if user is validated
      return sequelize.transaction(function (dbTransaction){//placing sql query in a transaction
        return  db.transactions
        .create(req.body, {transaction: dbTransaction})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      })
   
  }}
};
