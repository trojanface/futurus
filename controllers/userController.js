const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    if (req.user) {
    db.users.findAll({
      where: {isActive: true},
        attributes: ['totTime', 'totalTrans', 'user_id','userName', 'firstName','lastName','email','POS','userDesigner', 'itemDesigner', 'keyLayout', 'stocktake', 'reports', 'membership', 'advertising', 'refunds', 'cashDrops', 'balances']
    })
      .then(dbModel => {
          console.log(dbModel)
          res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  }},
  update: function(req, res) {
    if (req.user) {
    db.users
      .update(req.body, {
        where: {
          user_id: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }},
  delete: function(req, res) {
    if (req.user) {
    db.users
      .update({isActive: false},{
        where: {
          user_id: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }},
  create: function(req, res) {
    if (req.user) {
    console.log("adding new user")
    db.users
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }}
};
