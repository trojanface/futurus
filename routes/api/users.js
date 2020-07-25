const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users/all"
router.route("/all")
  .get(userController.findAll);
// Matches with "/api/users"
  router.route("/")
  .post(userController.create);
// Matches with "/api/users/:id"
router
  .route("/:id")
  .put(userController.update);

module.exports = router;
