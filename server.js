const server = require("server");
const { get, post } = require("server/router");
const { json, header } = require("server/reply");

function timeout(delayms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delayms);
  });
}

let lid = "close";

const position = { x: 0, y: 0, theta: 0 };

const waypoints = [
  {
    id: "a9b1857b-f2ef-4a63-a005-9e027d125254",
    name: "Home",
    coordinate: [0, 0, 0],
    meta: {},
  },
  {
    id: "61ad23f1-5b25-4ea8-b749-50a338a69081",
    name: "Destination A",
    coordinate: [1, 1, 0],
    meta: {},
  },
  {
    id: "ab021623-590a-41bd-a9ce-45b933a7326f",
    name: "Destination B",
    coordinate: [-1, -1, 0],
    meta: {},
  },
];

server({ security: { csrf: false }, port: 3001 }, [
  () => header("Access-Control-Allow-Origin", "*"),
  () =>
    header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    ),
  () =>
    header(
      "Access-Control-Allow-Methods",
      "GET, PUT, PATCH, POST, DELETE, HEAD"
    ),
  (ctx) => (ctx.method.toLowerCase() === "options" ? 200 : false),
  post("/set-lid", async (ctx) => {
    console.log("set-lid");
    console.log(ctx.data.lid);
    await timeout(1000);
    lid = ctx.data.lid;
    return json({});
  }),
  post("/set-goal", async (ctx) => {
    console.log("set-goal");
    console.log(ctx.data.waypoint);
    const waypoint = waypoints.find(
      (waypoint) => waypoint.name === ctx.data.waypoint
    );
    await timeout(1000);
    position.x = waypoint?.coordinate[0] || 0;
    position.y = waypoint?.coordinate[1] || 0;
    await timeout(2000);
    return json({});
  }),
  get("/map-waypoints", (ctx) => {
    return json(waypoints);
  }),
  get("/status", (ctx) => {
    let state = {
      charge: 70,
      charging: false,
      online: true,
      position,
      lid,
    };
    return json(state);
  }),
]);
