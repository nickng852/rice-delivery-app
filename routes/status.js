const express = require("express");
const router = express.Router();

const { lid, position } = require("./index");

router.get("/", (req, res) => {
  let state = {
    charge: 70,
    charging: false,
    online: true,
    position,
    lid,
  };

  return res.json(state);
});

module.exports = router;
