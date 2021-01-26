const immutable = require("immutable");
const { default: fetch } = require("node-fetch");

const store = immutable.Map({
  user: immutable.Map({ name: "Student" }),
  rovers: immutable.Map({
    curiosity: immutable.Map({ name: "Curiosity" }),
    opportunity: immutable.Map({ name: "Opportunity" }),
    spirit: immutable.Map({ name: "Spirit" }),
  }),
});

const updateStore = (state, newState) => {
  state = state.merge(state, newState);
  console.log(state.toJS());
};

const getRoverInfos = async (state, rover /*, action*/) => {
  fetch(`http://localhost:3000/${rover}`)
    .then((res) => res.json())
    .then(function (data) {
      let {
        name,
        landing_date,
        launch_date,
        status,
        max_sol,
        total_photos,
      } = data["photos"]["rover"];
      let newState = state.setIn(["rovers", rover], {
        name,
        landing_date,
        launch_date,
        status,
        max_sol,
        total_photos,
      });
      updateStore(state, newState);
    })
    .catch((error) => console.log(error));
};

const f = (state, rover) => {
  let rovers = state.get("rovers");
  if (rovers.includes(rover)) {
    getRoverInfos(state, rover);
  }
};

// //f(store, "Curiosity");

// getRoverInfos(store, "Spirit");



console.log(displayRover(store, "spirit"));
