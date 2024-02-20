const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");

require("dotenv").config();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware
app.use(cors());

// Routing
const statusRoute = require("./routes/status");
const mapwaypointsRoute = require("./routes/mapwaypoints");
const lidRoute = require("./routes/lid");
const goalRoute = require("./routes/goal");

app.use("/status", statusRoute);
app.use("/map-waypoints", mapwaypointsRoute);
app.use("/set-lid", lidRoute);
app.use("/set-goal", goalRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send(`Server running on http://localhost:${port}`);
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
