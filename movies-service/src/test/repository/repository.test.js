const { test } = require('@jest/globals');
const repository = require('../../repository/repository');

let testMovieId;

beforeAll(async () => {
    const movies = await repository.getAllMovies();
    testMovieId = movies[0]._id;
})

test('getAllMovies', async () => {
    const movies = await repository.getAllMovies();
    expect(Array.isArray(movies)).toBe(true);
    expect(movies.length).toBeGreaterThan(0);
})

test('getMovieById', async () => {
    const movie = await repository.getMovieById(testMovieId);
    expect(movie).toBeDefined();
    expect(movie._id).toEqual(testMovieId);
})

test('getMoviePremieres', async () => {
    const monthAgo = new Date();
    monthAgo.setMonth(-1);
    const movies = await repository.getMoviePremieres();
    expect(Array.isArray(movies)).toBeTruthy();
    
    expect(movies.length).toBeGreaterThan(0);
})