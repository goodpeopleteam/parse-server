const express = require('express');
const Parse = require('parse-server');

const app = express();

const api = Parse.ParseServer({
    databaseURI: 'mongodb://admin:Thegoodthepeople17@ds155718.mlab.com:55718/goodpeople-dev',
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