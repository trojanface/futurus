const db = require("../models");
const { sequelize } = require("../models");

// Defining methods for the deptController
module.exports = {
  findAll: function (req, res) {
    if (req.user) {//checking if user is validated
      db.departments.findAll({
        where: { isActive: true },
        attributes: ['dept_id', 'name']
      })
        .then(dbModel => {
          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    }
  },
  delete: function (req, res) {
    if (req.user) {//checking if user is validated
      return sequelize.transaction(function (dbTransaction) {//placing sql query in transaction
        return db.departments
          .update({ isActive: false }, {
            where: {
              dept_id: req.params.id
            }
          }, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })

    }
  },
  create: function (req, res) {
    if (req.user) {//checking if user is validated
      return sequelize.transaction(function (dbTransaction) {//placing sql query in transaction
        return db.departments
          .create(req.body, { transaction: dbTransaction })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })

    }
  }
};
