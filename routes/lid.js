const express = require("express");
const router = express.Router();

const { timeout, lid } = require("./index");

router.post("/", async (req, res) => {
  console.log("set-lid");
  console.log(req.body.lid);
  await timeout(1000);
  lid == req.body.lid;
  return res.json({});
});

module.exports = router;
