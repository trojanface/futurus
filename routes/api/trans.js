const router = require("express").Router();
const transController = require("../../controllers/transController");

// Matches with "/api/users/all"
// router.route("/all")
//   .get(userController.findAll);
// Matches with "/api/users"
  router.route("/")
  .post(transController.create);
// Matches with "/api/users/:id"
// router
//   .route("/:id")
//   .put(userController.update)
//   .delete(userController.delete);
  

module.exports = router;
