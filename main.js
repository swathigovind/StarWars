const resultsContainer = document.querySelector('#results');
  
// slide in effect
const cards = document.querySelectorAll(".profile-card");
cards.forEach(card => {
  card.style.transform = "translateX(0)";
});

//onLoad
window.addEventListener('load', function () {
  fetch('https://swapi.dev/api/people')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if(data) this.showResults(data.results);
      else alert("No Records Found.")
    })
    .catch(function (error) {
      console.error(error);
    });
});

//Display the people
function showResults(data) {
  let outPut = '';

  data.forEach((item, index) => {
    let genderIcon;
    if (item.gender === 'female') {
      genderIcon = 'assets/female-user-icon-7.jpg';
    } else if (item.gender === 'male') {
      genderIcon = 'assets/male-avatar-icon-6.jpg';
    } else {
      genderIcon = 'assets/unknown-person-icon-20.jpg';
    }
   
    this.reFormatHairColor(item);

    let films = [];

    Promise.all(
      item.films.map((filmId) =>
        fetch(`https://swapi.dev/api/films/${filmId.split('/')[5]}`)
          .then((response) => response.json())
          .then((filmData) => {
            films.push({
              title: filmData.title,
              url: filmData.url,
            });
          })
          .catch((error) => console.error(error))
      )

      
    ).then(() => {
      outPut += renderHtml(item,genderIcon,films);
      resultsContainer.innerHTML = outPut;
    });
  });

}

//Helper Functions

function renderHtml(item, genderIcon,films) {
  return   `<div class="card p-3 m-3 profile-card double-shaded-card" style="opacity:8">
         <img class="card-img-top" src="${genderIcon}">
         
         <div class="card-body">
           <h2 style="text-align: center;">${item.name}</h2>
           <span >Height: </span>${item.height} <br>
            <span >Hair Color: </span>${item.hair_color}<br>
            <span >Date of Birth: </span>${item.birth_year} <br>
            <span >Films: </span>
           <ul>
    ${films
    .map((film) => `<li><a href="filmDetail.html?title=${film.url}">${film.title}</a></li>`)
    .join('')}
           </ul>
         </div>  
       </div>  
      `
}

function reFormatHairColor(item){
item.hair_color = item.hair_color.split(',');
item.hair_color = item.hair_color.map((word) => word.trim().charAt(0).toUpperCase() + word.trim().slice(1));
item.hair_color = item.hair_color.join(', ');
return item.hair_color;
}



