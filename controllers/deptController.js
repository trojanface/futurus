const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    db.departments.findAll({
        attributes: ['name']
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
    console.log("adding new department")
    db.departments
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
