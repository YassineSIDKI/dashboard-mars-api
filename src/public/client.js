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

// const d = store.set("user", store.get("user").set("name", "Yassine"));
// console.log(d.get("user").get("name"));
// console.log(store.get("user").get("name"));

// add our markup to the page
//const root = document.getElementById("root");

// let newState = immutable.Map({
//   user: immutable.Map({ name: "Yassine" }),
//   rovers: immutable.List(["Curiosity", "YEah", "Spirit"]),
// });

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  let { rovers } = state;

  return `
        <header></header>
        <main>
            ${rovers.map((rover) => {
              displayRover(rover);
            })}
            <section >
            ${displayPhoto(rover)}
            </section>
        </main>
        <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
    return `
            <h1>Welcome, ${name}!</h1>
        `;
  }

  return `
        <h1>Hello!</h1>
    `;
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
  } else {
    return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
  }
};

// ------------------------------------------------------  API CALLS

// // Example API call
// const getImageOfTheDay = (state) => {
//   let { apod } = state;

//   fetch(`http://localhost:3000/apod`)
//     .then((res) => res.json())
//     .then((apod) => updateStore(store, { apod }));

//   return data;
// };

const getRoverInfos = (state, rover) => {
  let rovers = state.get("rovers");
  if (rovers.includes(rover)) {
  }

  return {};
};

//tested
const displayRover = (rover) => {
  let {
    id,
    name,
    landing_date,
    launch_date,
    status,
    max_sol,
    total_photos,
  } = rover.toJS();
  return `
          <section id = ${id}>
              <h1>${name}</h1>
              <h1>${landing_date}</h1>
              <h1>${launch_date}</h1>
              <h1>${status}</h1>
              <h1>${max_sol}</h1>
              <h1>${total_photos}</h1>
          </section>
      `;
};
//to test
const updateStore = (state, newState) => {
  state = state.merge(state, newState);
  render(root, state);
};

//tested
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
