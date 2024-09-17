//OMDB API: https://www.omdbapi.com/?apikey=6ac70b95&s=

// Global Variables and EventListeners
const movieListEl = document.querySelector(".movie-list");
const searchInputEl = document.querySelector(".movie__search--input");
const spinnerEl = document.querySelector(".spinner");
let storedMovies = [];

searchInputEl.addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  userSearch(searchTerm);
});

async function main(filter) {
  const movies = await fetch(
    "https://www.omdbapi.com/?apikey=6ac70b95&s=star wars"
  );
  const moviesSearch = await movies.json();

  const movieData = moviesSearch.Search;
  storedMovies = movieData;
  movieListEl.innerHTML = movieData.map((movie) => movieHTML(movie)).join("");
}

main();

function movieHTML(movie) {
  return `<div class="movie"><figure class="movie__poster">
                <img src="${movie.Poster}" alt="" class="movie__img" />
              </figure>
              <div class="movie__descriptors">
                <p class="movie__title">${movie.Title}</p>
                <p class="movie__year"><b>Year:</b> ${movie.Year}</p>
              </div></div>`;
}

async function userSearch(searchTerm) {
  if (searchTerm.length < 1) {
    movieListEl.innerHTML = "";
    return;
  }

  spinnerEl.classList.replace("spinner", "show__spinner");

  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=6ac70b95&s=${searchTerm}`
  );
  const moviesSearch = await movies.json();

  if (moviesSearch.Response === "True") {
    const movieData = moviesSearch.Search;
    storedMovies = movieData;
    movieListEl.innerHTML = movieData.map((movie) => movieHTML(movie)).join("");
    spinnerEl.classList.replace("show__spinner", "spinner");
  } else {
    movieListEl.innerHTML = "<p>No movies found</p>";
    spinnerEl.classList.replace("show__spinner", "spinner");
  }
}

function filterMovies(event) {
  const filter = event.target.value;

  let sortedMovies = [...storedMovies];

  switch (filter) {
    case "ALPHA__DESCENDING":
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
      break;
    case "ALPHA__ASCENDING":
      sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
      break;
    case "YEAR__DESCENDING":
      sortedMovies.sort((a, b) => b.Year - a.Year);
      break;
    case "YEAR__ASCENDING":
      sortedMovies.sort((a, b) => a.Year - b.Year);
      break;
    default:
      break;
  }

  movieListEl.innerHTML = sortedMovies.map((movie) => movieHTML(movie)).join("");
}
