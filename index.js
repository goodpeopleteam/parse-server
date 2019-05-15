const express = require('express');
const Parse = require('parse-server');

const app = express();

const api = Parse.ParseServer({
    databaseURI: process.env.DB_ENDPOINT,
    cloud: './src/cloud/index.js',
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    serverURL: `${process.env.SERVER_URL}/parse`
});

app.use('/parse', api);

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log(`parse-server running on port ${process.env.PORT}.`);
});