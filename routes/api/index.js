const router = require("express").Router();
const userRoutes = require("./users");
const deptRoutes = require("./dept");
const itemRoutes = require("./items");
// User routes
router.use("/users", userRoutes);
router.use("/depts", deptRoutes);
router.use("/items", itemRoutes);
module.exports = router;
