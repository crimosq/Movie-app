const request = require('postman-request');
// Set your API key for The Movie Database (TMDB).
const APIKEY = '9afb3f6495bd7301e701e09cc5096ee3';
// Require the custom module for finding similar movies.
const similar = require('./movieSimilar');

// Define the movielookUp function to search for a movie by its name.
const movielookUp = (moviename, callback) => {
    // Construct the URL to query the TMDB API with the movie name and your API key.
    url = 'https://api.themoviedb.org/3/search/movie?query=' + moviename + '&api_key=' + APIKEY;
    // Make an HTTP request to the TMDB API.
    request({url, json: true}, (err, {body}) => {
        // Handle any errors during the request (e.g., no network connection).
        if (err) {
            callback('Unable to connect', undefined);
        // Check if the response body has results and handle the case where no movies are found.
        } else if (body.results.length === 0) {
            callback('Try again', undefined);
        // If a movie is found, pass the details back via the callback.
        } else {
            callback(undefined, {
                movieID: body.results[0].id, // The ID of the first movie result.
                movieTitle: body.results[0].original_title, // The title of the first movie result.
                img_path: body.results[0].poster_path // The poster path of the first movie result.
            });
        }
    });
}

// Export the movielookUp function to be used in other modules.
module.exports = movielookUp;


