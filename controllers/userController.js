const db = require("../models");
const { sequelize } = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function (req, res) {
    if (req.user) {//checking if user is validated
      db.users.findAll({
        where: { isActive: true },
        attributes: ['totTime', 'totalTrans', 'user_id', 'userName', 'firstName', 'lastName', 'email', 'POS', 'userDesigner', 'itemDesigner', 'keyLayout', 'stocktake', 'reports', 'membership', 'advertising', 'refunds', 'cashDrops', 'balances']
      })
        .then(dbModel => {
          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    }
  },
  update: function (req, res) {
    if (req.user) {//checking if user is validated
      return sequelize.transaction(function (dbTransaction) {//places sql query in a transaction
        return db.users
          .update(req.body, {
            where: {
              user_id: req.params.id
            }
          }, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })

    }
  },
  delete: function (req, res) {
    if (req.user) {//checking if user is validated
      return sequelize.transaction(function (dbTransaction) {//places sql query in a transaction
        return db.users
          .update({ isActive: false }, {
            where: {
              user_id: req.params.id
            }
          }, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })

    }
  },
  create: function (req, res) {
    if (req.user) {//checking if user is validated
      return sequelize.transaction(function (dbTransaction) {//places sql query in a transaction
        return db.users
          .create(req.body, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })

    }
  }
};
