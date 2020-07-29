const db = require("../models");

// Defining methods for the userController
module.exports = {
 
  create: function(req, res) {
    if (req.user) {
    console.log("adding new transaction")
    db.transactions
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }}
};
