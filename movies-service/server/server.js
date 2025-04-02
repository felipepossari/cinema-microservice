const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

let server = null;

async function start() {
    const app = express();

    app.use(morgan('dev'));
    app.use(helmet());
    app.use(express.json());

    app.get('/health', (req, res) => {
        res.send('OK');
    });

    app.use((error, req, res, next) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });

    server = app.listen(process.env.PORT, () => {
        console.log(`Server ${process.env.SERVICE_NAME} is running on port ${process.env.PORT}`);
    });
}

async function stop() {
    if(server) await server.close();
}

module.exports = {
    start,
    stop
};