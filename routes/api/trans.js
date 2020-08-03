const router = require("express").Router();
const transController = require("../../controllers/transController");


  router.route("/")
  .post(transController.create);

  

module.exports = router;
