const db = require("../models");

// Defining methods for the userController
module.exports = {
      find: function(req, res) {
      console.log(req.params.id)
    db.products.findAll({
        where: {
          prod_id: req.params.id
        },
        attributes: ['name','cost','price','department']
    })
      .then(dbModel => {
          console.log(dbModel)
          res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  findAllWithDep: function(req, res) {
      console.log(req.params.id)
    db.products.findAll({
        where: {
          department: req.params.id
        },
        attributes: ['name','cost','price','department']
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
    console.log("adding new item")
    db.products
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
