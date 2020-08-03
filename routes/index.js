const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require("../config/passport");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.get("/logout", function (req, res) {//Logs out from the current passport session
  req.logout();
  res.redirect("/");
});
router.post('/auth/local', passport.authenticate("local"), function (req, res) {//when route called it uses the passport.authenticate middleware before running the callback function
  res.json(req.user);//returns the user from the authenticate function
});

router.use(function(req, res) {//catch all - return the react app
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
