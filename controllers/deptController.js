const db = require("../models");
const { sequelize } = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function(req, res) {
    if (req.user) {
    db.departments.findAll({
      where: {isActive: true},
        attributes: ['dept_id','name']
    })
      .then(dbModel => {
          res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  }},
  delete: function(req, res) {
    if (req.user) {
      return sequelize.transaction(function (dbTransaction) {
return db.departments
.update({isActive: false},{
  where: {
    dept_id: req.params.id
  }
},{transaction: dbTransaction})
.then(dbModel => res.json(dbModel))
.catch(err => res.status(422).json(err));
      })
    
  }},
  create: function(req, res) {
    if (req.user) {
      return sequelize.transaction(function (dbTransaction) {
        return db.departments
        .create(req.body,{transaction: dbTransaction})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      })
    
  }}
};
