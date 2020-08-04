const db = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

// Defining methods for the transController
module.exports = {
  create: function (req, res) {
    if (req.user) {//checking if user is validated
      return sequelize.transaction(function (dbTransaction) {//placing sql query in a transaction
        return db.transactions
          .create(req.body, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })
    }
  },
  findAll: function (req, res) {
    if (req.user) {//checking if user is validated
      console.log(req.query.start+" "+req.query.end)
      return db.transactions
        .findAll({
          where: {
            createdAt: {
              [Op.lte]: req.query.end,
              [Op.gte]: req.query.start
              
          }
          },
          attributes: ['trans_id', 'user', 'transItems', 'transValue', 'createdAt']
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  }
};
