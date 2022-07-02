// Global Variables
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=5abf9fd21bd3b51e9e020fd0c96dc10f&units=imperial";
const apiUrl = "http://localhost:8000/";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generate);
/* Function called by event listener */
function generate() {
  let data = {
    zipCode: document.getElementById("zip").value,
    content: document.getElementById("feelings").value,
    date: new Date(),
  };

  //Post Data To Api For Get Zip Code Information.
  getInformation(data.zipCode)
    .then((zipInfo) => {
      //Show alert if city is not found.
      if (zipInfo.cod != 200) return alert(zipInfo.message);
      //Post Data To Server For Saving And Display.
      data.temp = zipInfo.list[0].main.temp;
      toServer(data);
    })
    .catch(catchError);
}

/* Function to GET Web API Data*/
async function getInformation(zipCode) {
  return await (
    await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`
    )
  ).json();
}

/* Function to GET Project Data */
async function updateEntery() {
  let response = await fetch(`${apiUrl}All`);
  try {
    response
      .json()
      .then((data) => {
        document.getElementById("date").innerHTML = `Date is: ${data.date}`;
        document.getElementById("temp").innerHTML = `Temp is: ${data.temp}`;
        document.getElementById("content").innerHTML = `Your Feeling is: ${data.content}`;
      })
      .catch(catchError);
  } catch (error) {
    catchError(error);
  }
}

/* Function to POST data */
async function toServer(data) {
  let response = await fetch(`${apiUrl}post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    if (!response) {
      alert("Process failed");
      return;
    }
    response
      .json()
      .then((data) => {
        if (response) updateEntery();
        else alert("Process failed");
      })
      .catch(catchError);
  } catch (error) {
    catchError(error);
  }
}
