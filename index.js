// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://admin:Thegoodthepeople17@ds155428.mlab.com:55428/goodpeople-prod',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/src/cloud/main.js',
  appId: process.env.APP_ID || '4A13B770-895C-4EE8-BDF3-95C19F202210',
  masterKey: process.env.MASTER_KEY || 'master_key', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  publicServerURL: process.env.PUBLIC_SERVER_URL || 'http://sample-env.ukvcgvttuh.us-east-1.elasticbeanstalk.com/parse',
  appName: 'GoodPeople',
  // emailAdapter: {
  //   module: 'parse-server-simple-mailgun-adapter',
  //   // module: 'parse-server-mailgun-adapter-template',
  //   options: {
  //     // The address that your emails come from
  //     fromAddress: process.env.FROM_ADDRESS || 'heythere@goodpeopleapp.com.br',
  //     // Your domain from mailgun.com
  //     domain: 'goodpeopleapp.com.br',
  //     // Your API key from mailgun.com
  //     apiKey: 'key-37ae3fac3da8d1849ce8f140ca2a16a0'
  //   }
  // }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
