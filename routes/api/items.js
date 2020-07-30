const router = require("express").Router();
const itemController = require("../../controllers/itemController");

// Matches with "/api/users/:id"
router
  .route("/:id")
 .get(itemController.findAllWithDep)
 .put(itemController.update)
 .delete(itemController.delete);

router
  .route("/single/:id")
 .get(itemController.find);

 router
  .route("/find/:query")
 .get(itemController.query);

 router.route("/")
  .post(itemController.create)
  .get(itemController.findAllActive);

module.exports = router;
