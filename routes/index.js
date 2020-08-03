const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require("../config/passport");
const axios = require('axios').default;
require("dotenv").config();
// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.get("/logout", function (req, res) {//Logs out from the current passport session
  req.logout();
  res.redirect("/");
});

router.get("/weather", function (req, res) {//Logs out from the current passport session
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=adelaide&appid=${process.env.WEATHERID}`)
  .then(dbModel => {
   res.json(dbModel.data)
  })
  .catch(function (error) {
    console.log(error);
  })
});

router.post('/auth/local', passport.authenticate("local"), function (req, res) {//when route called it uses the passport.authenticate middleware before running the callback function
  res.json(req.user);//returns the user from the authenticate function
});

router.use(function(req, res) {//catch all - return the react app
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
//'https://api.openweathermap.org/data/2.5/weather?q=adelaide&appid=2a41be6b56e8918bc7efe98c840f4638'