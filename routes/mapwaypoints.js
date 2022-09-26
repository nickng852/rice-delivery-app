const express = require("express");
const router = express.Router();

const { waypoints } = require("./index");

router.get("/", (req, res) => {
  return res.json(waypoints);
});

module.exports = router;
