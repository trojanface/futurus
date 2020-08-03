const router = require("express").Router();
const itemController = require("../../controllers/itemController");

// Matches with "/api/items/:id"
router
  .route("/:id")
 .get(itemController.findAllWithDep)
 .put(itemController.update)
 .delete(itemController.delete);

// Matches with "/api/items/single/:id
router
  .route("/single/:id")
 .get(itemController.find);

 // Matches with "/api/items/find/:query
 router
  .route("/find/:query")
 .get(itemController.query);

 // Matches with "/api/items/
 router.route("/")
  .post(itemController.create)
  .get(itemController.findAllActive);

module.exports = router;
