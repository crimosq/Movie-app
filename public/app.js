
console.log('Client side javascript file is loaded!');

const APIKEY = '9afb3f6495bd7301e701e09cc5096ee3';

// Add an event listener for when the DOM content 
document.addEventListener('DOMContentLoaded', () => {
  
    const movieForm = document.querySelector('form');
    const search = document.querySelector('input');
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');

    // Add an event listener for the 'submit' event on the movie form.
    movieForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submit action.
        const movieTitle = search.value.trim(); // Get the movie title from the search input field and trim any whitespace.

        messageOne.textContent = 'Loading...'; // Display a loading message.
        messageTwo.innerHTML = ''; // Clear any previous results.

        try {
            // Fetch data from TMDB API for the entered movie title.
            const searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&api_key=${APIKEY}`);
            // Throw an error if the fetch request was unsuccessful.
            if (!searchResponse.ok) throw new Error(`HTTP error! Status: ${searchResponse.status}`);
            // Parse the JSON response.
            const searchData = await searchResponse.json();

            // Display a message if no movies are found.
            if (!searchData.results || searchData.results.length === 0) {
                messageOne.textContent = "No movies found.";
                return;
            }

            // Display details of the top movie from the search results.
            const topMovie = searchData.results[0];
            messageOne.innerHTML = `
                <div>
                    <h2>${topMovie.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w500${topMovie.poster_path}" alt="${topMovie.title}" style="width:200px;"><br>
                    <p>${topMovie.overview}</p>
                </div>
            `;

            // Fetch similar movies using the top movie's ID.
            const topMovieId = topMovie.id;
            const similarResponse = await fetch(`https://api.themoviedb.org/3/movie/${topMovieId}/similar?api_key=${APIKEY}`);
            const similarData = await similarResponse.json();

            // Display a message if no similar movies are found.
            if (!similarData.results || similarData.results.length === 0) {
                messageTwo.innerHTML = "No similar movies found.";
                return;
            }

            // Display each similar movie's details.
            similarData.results.forEach(movie => {
                messageTwo.insertAdjacentHTML('beforeend', `
                    <div>
                        <h3>${movie.title}</h3>
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="width:200px;"><br>
                        <p>${movie.overview}</p>
                    </div>
                `);
            });
        } catch (error) {
            // Log any errors to the console and display an error message.
            console.error('Error:', error);
            messageOne.textContent = 'An error occurred while fetching data.';
        }
    });
});
