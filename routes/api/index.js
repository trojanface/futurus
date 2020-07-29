const router = require("express").Router();
const userRoutes = require("./users");
const deptRoutes = require("./dept");
const itemRoutes = require("./items");
const transRoutes = require("./trans")
// User routes
router.use("/users", userRoutes);
router.use("/depts", deptRoutes);
router.use("/items", itemRoutes);
router.use("/trans", transRoutes);
module.exports = router;
