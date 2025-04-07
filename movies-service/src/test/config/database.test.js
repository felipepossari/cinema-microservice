const database = require('../../config/database');
const {test, expect} = require('@jest/globals');

test('connecting to mongodb', async () => {
    const connection = await database.connect();
    expect(connection).toBeTruthy();
});

test('disconnecting from mongodb', async () => {
    const connection = await database.connect();
    const isDisconnected = await database.disconnect(connection);
    expect(isDisconnected).toBeTruthy();
});