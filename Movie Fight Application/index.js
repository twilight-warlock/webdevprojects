const autocompleteConfig = {
  //   passing the autocomplete element
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
      <img src="${imgSrc}"/>
      <h2>${movie.Title} (${movie.Year})</h2>`;
  },

  //   Sending the value to be displayed when option is selected
  inputValueDisplayed(movie) {
    return movie.Title;
  },

  // Fetching the api of search word
  async fetchDataFromApi(movieIndex) {
    const res = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "b796d8f8",
        s: `${movieIndex}`,
      },
    });
    if (res.data.Error) {
      return [];
    }
    return res.data.Search;
  },
};

// --------------------------Functions------------------------------

let leftMovie, rightMovie;
// Show summary of the selected movie using ID
const onMovieSelection = async (movie, summary, selectedSide) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "b796d8f8",
      i: `${movie.imdbID}`,
    },
  });

  //   Checking for which side the movie was selected
  if (selectedSide === "left") {
    leftMovie = res.data;
  } else if (selectedSide === "right") {
    rightMovie = res.data;
  }
  summary.innerHTML = movieDisplay(res.data);
  if (leftMovie && rightMovie) {
    runComparison();
  }
};

// Running comparison between movie
const runComparison = () => {
  const leftSummaryStats = document.querySelectorAll(
    "#left-summary .notification"
  );
  const rightSummaryStats = document.querySelectorAll(
    "#right-summary .notification"
  );
  console.log(leftSummaryStats, rightSummaryStats);

  leftSummaryStats.forEach((leftStat, index) => {
    const rightStat = rightSummaryStats[index];

    const rightValue = rightStat.dataset.value;
    const leftValue = leftStat.dataset.value;

    if (rightValue > leftValue) {
      rightStat.classList.add("is-primary");
      leftStat.classList.add("is-warning");
    } else if (rightValue < leftValue) {
      leftStat.classList.add("is-primary");
      rightStat.classList.add("is-warning");
    } else {
      rightStat.classList.add("is-primary");

      leftStat.classList.add("is-primary");
    }
  });
};

// Displaying selected movie
const movieDisplay = (movieData) => {
  const boxOfficeCollection = parseInt(
    movieData.BoxOffice.replace(/,/g, "").slice(1)
  );
  const metaScore = parseInt(movieData.Metascore);
  const imdbRating = parseFloat(movieData.imdbRating);
  const imdbVotes = parseInt(movieData.imdbVotes.replace(/,/g, ""));

  // Better way with reduce
  const awards = movieData.Awards.split(" ").reduce((acc, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return acc;
    } else {
      return acc + value;
    }
  }, 0);

  //   Other way
  // let totalAwards = 0;
  //   const awards = movieData.Awards.split(" ").forEach((word) => {
  //     const value = parseInt(word);
  //     if (isNaN(value)) {
  //       return;
  //     } else {
  //       totalAwards += value;
  //     }
  //   });

  return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieData.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieData.Title}</h1>
                <h4>${movieData.Genre}</h4>
                <p>${movieData.Plot}</p>
            </div>
        </div>
    </article> 
    <article data-value=${awards} class="notification is-white is-light">
    <p class="title">${movieData.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article data-value=${boxOfficeCollection} class="notification is-white is-light">
    <p class="title">${movieData.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metaScore} class="notification is-white is-light">
    <p class="title">${movieData.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-white is-light">
    <p class="title">${movieData.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-white is-light">
    <p class="title">${movieData.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};

// ------------------------Executing functions----------------------

createAutocomplete({
  ...autocompleteConfig,
  autoCompleteEl: document.querySelector("#left-autocomplete"),

  //   What to do when an option is selected
  onOptionSelection(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelection(movie, document.querySelector("#left-summary"), "left");
  },
});
createAutocomplete({
  ...autocompleteConfig,
  autoCompleteEl: document.querySelector("#right-autocomplete"),

  //   What to do when an option is selected
  onOptionSelection(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelection(movie, document.querySelector("#right-summary"), "right");
  },
});
