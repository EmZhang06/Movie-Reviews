const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2ced4b849145769ac33466c413478aef&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=2ced4b849145769ac33466c413478aef&query=";

//depending on how many search we have, we are going to create as many div tags
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK); //the link we want to fetch from is the API, getting default movies from the API 
function returnMovies(url){
  fetch(url).then(res => res.json())
  .then(function(data){
    console.log(data.results);
    data.results.forEach(element => {
      const div_card = document.createElement("div");
      div_card.setAttribute("class", "card");
      
      const div_row = document.createElement("div");
      div_row.setAttribute("class", "row");
      
      const div_column = document.createElement("div");
      div_column.setAttribute("class", "column");
      
      const image = document.createElement("img");
      image.setAttribute("class", "thumbnail");
      image.setAttribute("Id", "image");
      
      const title = document.createElement("h3");
      title.setAttribute("Id", "title");
      
      const center = document.createElement("center");

      title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`; //setting the display value on the html 
      image.src = IMG_PATH + element.poster_path; //adding additional to root url 

      //creating the same structure we created in html
      center.appendChild(image); //because image is a child of center
      div_card.appendChild(center);
      div_card.appendChild(title);
      div_column.appendChild(div_card);
      div_row.appendChild(div_column);
      
      //appending all the divs to main, which is the section
      main.appendChild(div_row);
    });
  }); 
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = ""; //allows us to clear the section before we fetch new data (clear the movies we searched previously)

  const searchItem = search.value; //getting the value of the search input (the query of the input)

  //if there is an searched item, we are going to fetch the data from the API with our returnMovies function
  if(searchItem){
    returnMovies(SEARCHAPI + searchItem);
    search.value = ""; //clearing the input after we fetch the data
  }
})