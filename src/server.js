// Require the Express module to set up an HTTP server.
const express = require('express');
// Require the custom module for looking up movies by name.
const movielookUp = require('./movielookup');
// Require the custom module for finding similar movies.
const similar = require('./movieSimilar');
// Create an instance of Express.
const app = express();

// Serve static files from the 'public' directory 
app.use(express.static('../public'));

// Define a route handler for GET requests to the '/search' endpoint.
app.get('/search', (req, res) => {
    // Extract the movie name from the query parameters.
    const movieName = req.query.movie;
    // Use the movielookUp function to search for the movie.
    movielookUp(movieName, (err, result) => {
        // Handle any errors or the case where the movie is not found.
        if (err || !result) {
            return res.send({ error: err || 'Movie not found' });
        }
        // Use the similar function to find movies similar to the one found.
        similar(result.movieID, (error, similarMovies) => {
            // Handle any errors in finding similar movies.
            if (error) {
                return res.send({ error });
            }
            // Send the similar movies back in the response.
            res.send({ similarMovies });
        });
    });
});

const port = 4000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
