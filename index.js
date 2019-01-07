const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');

const app = express();

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}

const port = process.env.PORT || 1337;

const api = ParseServer({
    databaseURI: databaseUri || 'mongodb://admin:Thegoodthepeople17@ds155428.mlab.com:55428/goodpeople-prod',
    cloud: process.env.CLOUD_CODE_MAIN || './src/cloud/main.js',
    appId: process.env.APP_ID || '4A13B770-895C-4EE8-BDF3-95C19F202210',
    masterKey: process.env.MASTER_KEY || 'master_key',
    serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
    publicServerURL: process.env.PUBLIC_SERVER_URL || 'http://sample-env.ukvcgvttuh.us-east-1.elasticbeanstalk.com/parse',
    appName: 'GoodPeople',
    emailAdapter: {
      module: 'parse-server-simple-mailgun-adapter',
      options: {
        fromAddress: process.env.FROM_ADDRESS || 'heythere@goodpeopleapp.com.br',
        domain: 'goodpeopleapp.com.br',
        apiKey: 'key-37ae3fac3da8d1849ce8f140ca2a16a0'
      }
    }
});

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/parse', api);

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('parse-server-example running on port 1337.');
});