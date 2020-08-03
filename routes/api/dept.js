const router = require("express").Router();
const deptController = require("../../controllers/deptController");

// Matches with "/api/depts/all"
router.route("/all")
  .get(deptController.findAll);
// Matches with "/api/depts"
router.route("/")
  .post(deptController.create);
// Matches with "/api/depts/:id"
router
  .route("/:id")
  .delete(deptController.delete);



module.exports = router;
