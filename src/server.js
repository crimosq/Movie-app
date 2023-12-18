
const express = require('express');
const movielookUp = require('./movie-lookup');
const movieSimilar = require('./movieSimilar');
const app = express();

app.use(express.static('../public'));

app.get('/search', (req, res) => {
    const movieName = req.query.movie;
    movielookUp(movieName, (err, result) => {
        if (err || !result) {
            return res.send({ error: err || 'Movie not found' });
        }
        movieSimilar(result.movieID, (error, similarMovies) => {
            if (error) {
                return res.send({ error });
            }
            res.send({ similarMovies });
        });
    });
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
