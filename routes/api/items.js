const router = require("express").Router();
const itemController = require("../../controllers/itemController");

// Matches with "/api/users/:id"
router
  .route("/:id")
 .get(itemController.findAllWithDep);

router
  .route("/single/:id")
 .get(itemController.find);

 router.route("/")
  .post(itemController.create);

module.exports = router;
