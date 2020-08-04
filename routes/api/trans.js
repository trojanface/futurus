const router = require("express").Router();
const transController = require("../../controllers/transController");


  router.route("/")
  .post(transController.create);

  router.route("/")
  .get(transController.findAll);
  

module.exports = router;
