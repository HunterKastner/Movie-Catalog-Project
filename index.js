//OMDB API: https://www.omdbapi.com/?apikey=6ac70b95&s=

const movieListEl = document.querySelector(".movie-list");

async function main() {
  const movies = await fetch(
    "https://www.omdbapi.com/?apikey=6ac70b95&s=star wars"
  );
  const moviesSearch = await movies.json();

  const movieData = moviesSearch.Search;

  movieListEl.innerHTML = movieData.map((movie) => movieHTML(movie)).join("");
}

main();

function movieHTML(movie) {
  return `<div class="movie"><figure class="movie__poster">
                <img src="${movie.Poster}" alt="" class="movie__img" />
              </figure>
              <div class="movie__descriptors">
                <p class="movie__title"><b>Title:</b> ${movie.Title}</p>
                <p class="movie__year"><b>Year</b> ${movie.Year}</p>
              </div></div>`;
}
