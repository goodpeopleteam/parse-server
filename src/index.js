import express from 'express';
import * as Parse from 'parse-server';

const app = express();

const api = Parse.ParseServer({
    databaseURI: 'mongodb://localhost:27017/goodpeople-prod',
    cloud: './src/cloud/index.js',
    appId: 'app_id',
    masterKey: 'master_key',
    serverURL: 'http://localhost:1337/parse'
});

app.use('/parse', api);

app.listen(1337, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('parse-server-example running on port 1337.');
});