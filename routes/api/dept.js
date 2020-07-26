const router = require("express").Router();
const deptController = require("../../controllers/deptController");

// Matches with "/api/users/all"
router.route("/all")
  .get(deptController.findAll);
// Matches with "/api/depts"
  router.route("/")
  .post(deptController.create);
// Matches with "/api/users/:id"
// router
//   .route("/:id")
//   .put(userController.update);

module.exports = router;
