const urlParams = new URLSearchParams(window.location.search);
const characterUrl = urlParams.get("name");

fetch(characterUrl)
  .then(response => response.json())
  .then(data => {
    populateImage(data);
    populateDetails(data);
    populateVehicles(data);
    populateStarships(data);
  });

function populateImage(data) {
  const imageDivider = document.getElementById("image-divider");
  imageDivider.innerHTML = `<img  class="card-image" src="assets/Characters_New.JPG" alt="${data.name}"/>`;
}

function populateDetails(data) {
  const detailsDivider = document.getElementsByClassName("details-divider")[0];
  detailsDivider.innerHTML = `
        <h2 style="text-align: center;">${data.name}</h2>
        <p>Height: ${data.height}</p>
        <p>Mass: ${data.mass}</p>
        <p>Gender: ${data.gender}</p>
        <p>Hair Color: ${data.hair_color}</p>
        <p>Eye Color: ${data.eye_color}</p>
      `;
}

function populateVehicles(data) {
  const vehiclesDivider = document.getElementsByClassName("details-divider")[1];
  vehiclesDivider.innerHTML = `<h3 style="text-align: center; margin-top: 0;" >Vehicles</h3>`;
  data.vehicles.forEach((vehicle) => {
    fetch(vehicle)
      .then((response) => response.json())
      .then((vehicleData) => {
        vehiclesDivider.innerHTML += `<p>${vehicleData.name}</p>`;
      });
  });
}

function populateStarships(data) {
  const starshipsDivider = document.getElementsByClassName("details-divider")[2];
  starshipsDivider.innerHTML = `<h3 style="text-align: center; margin-top: 0;">Starships</h3>`;
  data.starships.forEach((starship) => {
    fetch(starship)
      .then((response) => response.json())
      .then((starshipData) => {
        starshipsDivider.innerHTML += `<p>${starshipData.name}</p>`;
      });
  });
}
