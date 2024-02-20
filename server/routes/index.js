function timeout(delayms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delayms);
  });
}

let lid = "Close";

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

module.exports = { timeout, lid, position, waypoints };
