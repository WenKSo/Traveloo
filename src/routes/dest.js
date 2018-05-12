const express = require("express");
const router = express.Router();
const destData = require("../data/destinations");

router.get("/", (req, res) => {
  const destList = destData.destinationList;
  res.render("destinations", { destination: destList });

});

module.exports = router;
