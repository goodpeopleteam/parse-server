var root = __dirname;
var signer = require(root + "/node_modules/jsrsasign/lib/jsrsasign.js");

var layerProviderID = '';
var layerKeyID = '';
var privateKey = '';

module.exports = {
    initialize: function (providerID, keyID, key) {
        if (!providerID) throw new Error('Missing providerID parameter');
        if (!keyID) throw new Error('Missing keyID parameter');
        if (!key) throw new Error('Missing private key parameter');

        this.layerProviderID = providerID;
        this.layerKeyID = keyID;
        this.privateKey = key;

        return this;
    },

    layerIdentityToken: function (user, nonce) {
        var header = JSON.stringify({
            typ: "JWT", // Expresses a MIME Type of application/JWT
            alg: "RS256", // Expresses the type of algorithm used to sign the token, must be RS256
            cty: "layer-eit;v=1", // Express a Content Type of application/layer-eit;v=1
            kid: this.layerKeyID,
        });

        var currentTimeInSeconds = Math.round(new Date() / 1000);
        var expirationTime = currentTimeInSeconds + 10000;

        var claim = JSON.stringify({
            iss: this.layerProviderID, // The Layer Provider ID
            prn: user.id, // User Identifiers
            iat: currentTimeInSeconds, // Time of Token Issuance
            exp: expirationTime, // Arbitrary time of Token Expiration
            nce: nonce, //Nonce obtained from the request
            first_name : user.get('firstName'), // Optional String: First name for the user
            last_name : user.get('lastName'), // Optional String: Last name for the user
            display_name : user.get('completeName') || user.get('firstName') + ' ' + user.get('lastName') // Optional String: The name to show onscreen for the user
            //avatar_url : user.pictureUrl // Optional String: URL to profile photo for the user
        });

        var token = signer.jws.JWS.sign('RS256', header, claim, this.privateKey);
        return token;
    }
}
