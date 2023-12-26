const request = require('postman-request');
// Define your API key for The Movie Database (TMDB).
const APIKEY = '9afb3f6495bd7301e701e09cc5096ee3';

// Define the 'similar' function to find movies similar to a given movie ID.
const similar = (movieID, callback) => {
    // Construct the URL to query the TMDB API for similar movies.
    const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/similar?language=en-US&page=1' + '&api_key=' + APIKEY;
    
    // Make an HTTP request to the TMDB API.
    request({url, json: true}, (err, res) => {
        // Handle any errors during the request (e.g., no network connection).
        if (err) {
            callback('Unable to connect', undefined);
        // Check if the response body has results and handle the case where no similar movies are found.
        } else if (res.body.results.length === 0) {
            callback('Try again', undefined);
        // If similar movies are found, pass the results back via the callback.
        } else {
            callback(undefined, res.body.results);
        }
    });
}

// Export the 'similar' function to be used in other modules.
module.exports = similar;
