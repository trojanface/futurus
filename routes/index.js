const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require("../config/passport");

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.get("/logout", function (req, res) {//Logs out from the current passport session
  console.log(req)
  req.logout();
  
  res.redirect("/");
});
router.post('/auth/local', passport.authenticate("local"), function (req, res) {//when route called it uses the passport.authenticate middleware before running the callback function
     console.log("api hit")
  res.json(req.user);//returns the user from the authenticate function
});


router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
