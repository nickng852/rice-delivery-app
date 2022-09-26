const express = require("express");
const router = express.Router();

const { timeout, position, waypoints } = require("./index");

router.post("/", async (req, res) => {
  console.log("set-goal");
  console.log(req.body.waypoint);
  const waypoint = waypoints.find(
    (waypoint) => waypoint.name === req.body.waypoint
  );
  await timeout(1000);
  position.x = waypoint?.coordinate[0] || 0;
  position.y = waypoint?.coordinate[1] || 0;
  await timeout(2000);
  return res.json({});
});

module.exports = router;
