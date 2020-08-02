const db = require("../models");
const { sequelize } = require("../models");

// Defining methods for the userController
module.exports = {
  query: function (req, res) {
    if (req.user) {
      db.products.findAll({
        where: {
          name: req.params.query,
          isActive: true
        },
        attributes: ['stockCount', 'prod_id', 'name', 'cost', 'price', 'department', 'iconPath', 'upsell']
      })
        .then(dbModel => {

          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    }
  },
  find: function (req, res) {
    if (req.user) {
      db.products.findAll({
        where: {
          prod_id: req.params.id,
          isActive: true
        },
        attributes: ['stockCount', 'prod_id', 'name', 'cost', 'price', 'department', 'iconPath', 'upsell']
      })
        .then(dbModel => {

          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    }
  },
  findAllActive: function (req, res) {
    if (req.user) {
      db.products.findAll({
        where: {
          isActive: true
        },
        attributes: ['stockCount', 'prod_id', 'name', 'cost', 'price', 'department', 'iconPath', 'upsell']
      })
        .then(dbModel => {

          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    } else {
      console.log("not logged in")
    }
  },
  findAllWithDep: function (req, res) {
    if (req.user) {
      db.products.findAll({
        where: {
          department: req.params.id,
          isActive: true
        },
        attributes: ['stockCount', 'prod_id', 'name', 'cost', 'price', 'department', 'iconPath', 'upsell']
      })
        .then(dbModel => {

          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    }
  },
  delete: function (req, res) {
    if (req.user) {
      return sequelize.transaction(function (dbTransaction) {
        return db.products
          .update({ isActive: false }, {
            where: {
              prod_id: req.params.id
            }
          }, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })

    }
  },
  update: function (req, res) {
    if (req.user) {
      return sequelize.transaction(function (dbTransaction) {
        return db.products
          .update(req.body, {
            where: {
              prod_id: req.params.id
            }
          }, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })

    }
  },
  create: function (req, res) {
    if (req.user) {
      return sequelize.transaction(function (dbTransaction) {
        return db.products
          .create(req.body, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })

    }
  }
};
