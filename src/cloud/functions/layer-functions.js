const fs = require('fs');
const layer = require('../layer-parse-module/layer-module');
const path = require('path');

const layerProviderID = 'layer:///providers/2fdb6962-5286-11e5-b8db-919013011873'; // Should have the format of layer:///providers/<GUID>
const layerKeyID = 'layer:///keys/cb92e4ca-617c-11e5-852a-72c700000104'; // Should have the format of layer:///keys/<GUID>
const privateKey = fs.readFileSync(path.resolve(__dirname, '../layer-parse-module/keys/layer-key')).toString();

layer.initialize(layerProviderID, layerKeyID, privateKey);

const generateToken = (request) => {
    const nonce = request.params.nonce;
    if (!nonce) throw new Error('Missing nonce parameter');

    const currentUser = request.user;
    if (!currentUser) throw new Error('You need to be logged in!');

    return layer.layerIdentityToken(currentUser, nonce);
};

module.exports = {
    generateToken
};