var root = __dirname;
var fs = require('fs');
var layer = require('./layer-parse-module/layer-module');
var diacritics = require('./diacritics');

var layerProviderID = 'layer:///providers/2fdb6962-5286-11e5-b8db-919013011873'; // Should have the format of layer:///providers/<GUID>
var layerKeyID = 'layer:///keys/cb92e4ca-617c-11e5-852a-72c700000104'; // Should have the format of layer:///keys/<GUID>
var privateKey = fs.readFileSync(root + '/layer-parse-module/keys/layer-key.js').toString();

layer.initialize(layerProviderID, layerKeyID, privateKey);

Parse.Cloud.define('generateToken', function(request, response) {
    var nonce = request.params.nonce;
    if (!nonce) throw new Error('Missing nonce parameter');

    var currentUser = request.user;
    if (!currentUser) throw new Error('You need to be logged in!');

    response.success(layer.layerIdentityToken(currentUser, nonce));
});

function setUserSanitizedSkills(user) {
    var skills = user.get('skills') || [];
    var sanitizedSkills = new Array(skills.length);
    for (var i = 0; i < skills.length; i++) {
        sanitizedSkills[i] = diacritics.removeDiacritics(skills[i]);
    }
    user.set('sanitizedSkills', sanitizedSkills);
}

function setUserCompleteName(user) {
    var firstName = user.get('firstName') || '';
    var lastName = user.get('lastName') || '';
    var completeName = firstName + ' ' + lastName;
    completeName = completeName.trim().toLowerCase();
    user.set('completeName', completeName);
}

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
    var user = request.object;

    setUserCompleteName(user);
    setUserSanitizedSkills(user);

    response.success();
});

// Parse.Cloud.job('updateUsers', function(request, status) {
//     Parse.Cloud.useMasterKey();
//     var counter = 0;
//     var query = new Parse.Query(Parse.User);
//     query.each(function(user) {
//         setUserCompleteName(user);
//         setUserSanitizedSkills(user);
//         counter += 1;
//         return user.save();
//     }).then(function() {
//         status.success(counter + ' users were updated successfully.');
//     }, function(error) {
//         status.error('Uh oh, something went wrong.');
//     });
// });
