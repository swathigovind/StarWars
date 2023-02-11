const urlParams = new URLSearchParams(window.location.search);
const filmTitle = urlParams.get('title');

const fetchFilmDetails = async () => {
  const response = await fetch(`${filmTitle}`);
  const filmDetail = await response.json();

  if (filmDetail) {
    this.displayFilmDetail(filmDetail);
  } else {
    document.getElementById('film-title').textContent = 'Film not found';
  }
};

//Helper functions

function displayFilmDetail(filmDetail) {
  document.getElementById('film-title').textContent = filmDetail.title;
  document.getElementById('release-date').textContent = filmDetail.release_date;
  document.getElementById('director').textContent = filmDetail.director;
  document.getElementById('producer').textContent = filmDetail.producer;
  document.getElementById('opening-crawl').innerHTML = filmDetail.opening_crawl;
  let charactersList = filmDetail.characters;
  let charactersElement = document.getElementById("characters");
  charactersList.forEach(character => {
    fetch(character)
      .then(response => response.json())
      .then(characterData => {
        let characterName = document.createTextNode(characterData.name + " ");
        let link = document.createElement("a");
        link.href = `characterDetail.html?name=${character}`;
        link.appendChild(characterName);
        charactersElement.appendChild(link);
        charactersElement.appendChild(document.createElement("br"));
      });
  });
}

fetchFilmDetails();