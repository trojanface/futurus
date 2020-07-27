const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    if (req.user) {
    db.departments.findAll({
      where: {isActive: true},
        attributes: ['dept_id','name']
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
          user_id: req.params.id,
          isActive: true
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }},
  delete: function(req, res) {
    if (req.user) {
    db.departments
      .update({isActive: false},{
        where: {
          dept_id: req.params.id
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }},
  create: function(req, res) {
    if (req.user) {
    console.log("adding new department")
    db.departments
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }}
};
