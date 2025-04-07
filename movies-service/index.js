//index.js
const movies = require('./api/movies');
const repository = require('./repository/repository');
const server = require('./server/server');

// IIFE => Immediately Invoked Function Expression
(async () => {
    try {
        await server.start(movies, repository);
    } catch (error) {
        console.log(error);
    }
})();