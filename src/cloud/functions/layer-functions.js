const root = __dirname;
const fs = require('fs');
const layer = require('./layer-parse-module/layer-module');

const layerProviderID = 'layer:///providers/2fdb6962-5286-11e5-b8db-919013011873'; // Should have the format of layer:///providers/<GUID>
const layerKeyID = 'layer:///keys/cb92e4ca-617c-11e5-852a-72c700000104'; // Should have the format of layer:///keys/<GUID>
const privateKey = fs.readFileSync(root + '/layer-parse-module/keys/layer-key.js').toString();

layer.initialize(layerProviderID, layerKeyID, privateKey);

const generateToken = (request, response) => {
    var nonce = request.params.nonce;
    if (!nonce) throw new Error('Missing nonce parameter');

    var currentUser = request.user;
    if (!currentUser) throw new Error('You need to be logged in!');

    response.success(layer.layerIdentityToken(currentUser, nonce));
});

module.exports = {
    generateToken
}