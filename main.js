const apiKey = import.meta.env.VITE_API_KEY;
//  const URL = `http://www.omdbapi.com/?apikey=${apiKey}&${search}`;

const image =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';

const titleSearch = document
  .getElementById('title-search')
  .addEventListener('input', searchMovies);
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
let moviePoster = '';

async function getMovies(movieTitle) {
  const URL = `https://www.omdbapi.com/?s=${movieTitle}&page=1&apikey=${apiKey}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data.Search);
  if ((data.Response = 'true')) showMovies(data.Search);
}

function searchMovies() {
  let movieTitle = document.getElementById('title-search').value.trim();
  console.log(movieTitle);
  if (movieTitle.length > 0) {
    searchList.classList.remove('hide-search-list');
    getMovies(movieTitle);
  } else {
    searchList.classList.add('hide-search-list');
  }
}
function showMovies(movie) {
searchList.innerHTML = '';
for(let i =0; i < movie.length; i++){
  let movieListitem =document.createElement('div');
  movieListitem.dataset.id= movie[i].imdbID;
  movieListitem.classList.add('search-list-item');
  if(movie[i].Poster !== 'N/A')
    moviePoster =movie[i].Poster;
  else
    moviePoster = `${image}`;
  
    movieListitem.innerHTML =`
    <div class="search-item-thumbnail">
    <img
      src="${moviePoster}"
      alt="no Image"
    />
  </div>
  <div class="search-item-info">
    <h2>${movie[i].Title}

    </h2>

    <p>${movie[i].Year}</p>
  </div>
    `;

    searchList.appendChild(movieListitem);
    
}
}