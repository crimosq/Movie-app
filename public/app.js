
console.log('Client side javascript file is loaded!');
const APIKEY = '9afb3f6495bd7301e701e09cc5096ee3';

document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.querySelector('form');
    const search = document.querySelector('input');
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');

    movieForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const movieTitle = search.value.trim();

        messageOne.textContent = 'Loading...';
        messageTwo.innerHTML = '';

        try {
            const searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}&api_key=${APIKEY}`);
            if (!searchResponse.ok) throw new Error(`HTTP error! Status: ${searchResponse.status}`);
            const searchData = await searchResponse.json();

            if (!searchData.results || searchData.results.length === 0) {
                messageOne.textContent = "No movies found.";
                return;
            }

            const topMovieId = searchData.results[0].id;
            const similarResponse = await fetch(`https://api.themoviedb.org/3/movie/${topMovieId}/similar?api_key=${APIKEY}`);
            const similarData = await similarResponse.json();

            if (!similarData.results || similarData.results.length === 0) {
                messageTwo.innerHTML = "No similar movies found.";
                return;
            }

            similarData.results.forEach(movie => {
                messageTwo.insertAdjacentHTML('beforeend', `
                    <div>
                        <h3>${movie.title}</h3>
                        <p>${movie.overview}</p>
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" style="width:200px;"><br>
                    </div>
                `);
            });
        } catch (error) {
            console.error('Error:', error);
            messageOne.textContent = 'An error occurred while fetching data.';
        }
    });
});
