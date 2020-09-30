//Check if JS loads
console.log("app.js loaded");

//Constants and Lets
const vizContainer = document.getElementById("vizContainer");
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const options = {
  device: "desktop",
  height: 800,
  width: 1000,
};
let viz;
//button constants
const hideViz = document.getElementById("hideViz");
const showViz = document.getElementById("showViz");
const Central = document.getElementById("Central");
const North = document.getElementById("North");
const South = document.getElementById("South");
const revertBtn = document.getElementById("revertBtn");

//funtction to initiate your viz
function initViz() {
  console.log("My viz is loading..");
  viz = new tableau.Viz(vizContainer, url, options);
}

//when to execute the function
document.addEventListener("DOMContentLoaded", initViz);

//function to hide the viz
function hidetableau() {
  console.log("hiding viz");
  viz.hide();
}

//when to execute the hide function
hideViz.addEventListener("click", hidetableau);

//function to show the viz
function showtableau() {
  console.log("showing viz");
  viz.show();
}

//when to execute the show function
showViz.addEventListener("click", showtableau);

//function for filtering to Region
function filterRegion(value) {
  const sheettofilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");
  console.log(sheettofilter);

  sheettofilter.applyFilterAsync(
    "Region",
    value,
    tableau.FilterUpdateType.REPLACE
  );
}

//looping through filters and obtain the value
document.querySelectorAll(".filter").forEach((button) => {
  console.log(button);
  button.addEventListener("click", (e) => filterRegion(e.target.value));
});

//revert function
function revertTableau() {
  console.log("reverting viz");
  viz.revertAllAsync();
}

//link to the revertBtn
revertBtn.addEventListener("click", revertTableau);
