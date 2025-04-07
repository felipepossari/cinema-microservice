module.exports = (app, repository) => {
    app.get('/movies/premieres', async (req, res) => {
        const movies = await repository.getMoviePremieres();

        if (!movies || movies.length === 0) {
            res.status(404);
        }

        res.json(movies);
    });

    app.get('/movies/:id', async (req, res) => {
        const movie = await repository.getMovieById(req.params.id);

        if (!movie) {
            res.status(404);
        }

        res.json(movie);
    });

    app.get('/movies', async (req, res) => {
        const movies = await repository.getAllMovies();

        if (!movies || movies.length === 0) {
            res.status(404);
        }

        res.json(movies);
    });
}