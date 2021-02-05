const immutable = require("immutable");
const { default: fetch } = require("node-fetch");

const store = immutable.Map({
  user: immutable.Map({ name: "Student" }),
  rovers: immutable.List(["curiosity", "opportunity", "spirit"]),
  r: immutable.Map({
    curiosity: immutable.Map({ name: "Curiosity" }),
    opportunity: immutable.Map({ name: "Opportunity" }),
    spirit: immutable.Map({ name: "Spirit" }),
  }),
});

const updateStore = (state, newState) => {
  state = state.merge(state, newState);
  render(root, state);
};

//add our markup to the page
const root = document.getElementById("root");

const render = async (root, state) => {
  root.innerHTML = App(state);
};

const testClick = () => {
  alert("hello");
};
const header = (state) => {
  return state
    .get("rovers")
    .map((item) => `<button onclick=testClick()>${item}</button>`)
    .reduce((result, currentItem) => result + currentItem);
};

const App = (state) => completeUI(state, header, core);

const completeUI = (state, header, core) => {
  return `
  <div>
    ${header(state)}
  </div>

  <div>
    ${core(state, getRoverInfos, getRoverPhotos)}
  </div>

  `;
};

const core = (state, getRoverInfos, getRoverPhotos) => {
  return state.get("r").map(function (item) {
    console.log(item.toJS());
    return `<div>${getRoverInfos(
      item
    )}</div><div>${getRoverPhotos(item)}</div>`;
  });
};

const getRoverInfos = (item) => {};

const getRoverPhotos = (item) => {};

const renderSelectedRoverInfos = (state) => {};

const renderRoversInfos = (state) =>
  state.get("rovers").map(function (rover) {
    return `
    <div>start section </div>
    <section id = ${rover.get("id")}>
              <h1>${rover.get("name")}</h1>
              <h1>${rover.get("landing_date")}</h1>
              <h1>${rover.get("launch_date")}</h1>
              <h1>${rover.get("status")}</h1>
              <h1>${rover.get("max_sol")}</h1>
              <h1>${rover.get("total_photos")}</h1>
    </section>`;
  });

//tested
const displayRoverInfo = (rover) => {
  let {
    id,
    name,
    landing_date,
    launch_date,
    status,
    max_sol,
    total_photos,
  } = rover;
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

//tested
const updateRoversInfos = async (state, rover, callback) => {
  console.log("rover ===", rover);
  let { name } = rover;
  console.log(name);
  fetch(`http://localhost:3000/${name}`)
    .then((res) => res.json())
    .then(function (data) {
      let {
        id,
        name,
        landing_date,
        launch_date,
        status,
        max_sol,
        total_photos,
      } = data["photos"]["rover"];
      let newState = state.setIn(
        ["rovers", name],
        immutable.Map({
          id,
          name,
          landing_date,
          launch_date,
          status,
          max_sol,
          total_photos,
        })
      );
      callback(state, newState);
    })
    .catch((error) => console.log(error));
};

// // create content
// const App = (state) => {
//   //let rovers = state.get("rovers");
//   //console.log(rovers.toJS());
//   return `
//         <header></header>
//         <main>
//             <div>
//             ${test(state)}
//             </div>

//         </main>
//         <footer></footer>
//     `;
// };

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

completeUI(store);

// ------------------------------------------------------  COMPONENTS

// // Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//   if (name) {
//     return `
//             <h1>Welcome, ${name}!</h1>
//         `;
//   }

//   return `
//         <h1>Hello!</h1>
//     `;
// };

// // Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {
//   // If image does not already exist, or it is not from today -- request it again
//   const today = new Date();
//   const photodate = new Date(apod.date);
//   console.log(photodate.getDate(), today.getDate());

//   console.log(photodate.getDate() === today.getDate());
//   if (!apod || apod.date === today.getDate()) {
//     getImageOfTheDay(store);
//   }

//   // check if the photo of the day is actually type video!
//   if (apod.media_type === "video") {
//     return `
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `;
//   } else {
//     return `
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `;
//   }
// };

// ------------------------------------------------------  API CALLS

// // Example API call
// const getImageOfTheDay = (state) => {
//   let { apod } = state;

//   fetch(`http://localhost:3000/apod`)
//     .then((res) => res.json())
//     .then((apod) => updateStore(store, { apod }));

//   return data;
// };
