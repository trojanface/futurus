const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    db.users.findAll({
        attributes: ['user_id','firstName','lastName','email','POS','userDesigner', 'itemDesigner', 'keyLayout', 'stocktake', 'reports', 'membership', 'advertising', 'refunds', 'cashDrops', 'balances']
    })
      .then(dbModel => {
          console.log(dbModel)
          res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.users
      .update(req.body, {
        where: {
          user_id: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("adding new user")
    db.users
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
