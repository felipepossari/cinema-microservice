const database = require('../config/database');
const { ObjectId } = require('mongodb');

async function getAllCities() {
    const db = await database.connect();
    return db.collection('cinemaCatalog')
        .find({})
        .project({ cidade: 1, uf: 1, pais: 1 })
        .toArray();
}

async function getCinemasByCityId(cityId) {
    const objectCityId = new ObjectId(cityId);
    const db = await database.connect();
    const cidade = await db.collection('cinemaCatalog')
        .findOne({ _id: objectCityId }, { projection: { cinemas: 1 } });
    return cidade.cinemas;
}

async function getMoviesByCinemaId(cinemaId) {
    const objectCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
    const cinema = await db.collection('cinemaCatalog').aggregate([
        { $match: { "cinemas._id": objectCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "cinemas.salas" },
        { $unwind: "cinemas.salas.sessoes" },
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } }
    ]).toArray();

    return group.map(g => g._id);
}

module.exports = {
    getAllCities,
    getCinemasByCityId,
    getMoviesByCinemaId
}