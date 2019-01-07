const fetch = require('node-fetch');
const diacritics = require('./diacritics');

function setUserCompleteName(user) {
    var firstName = user.get('firstName') || '';
    var lastName = user.get('lastName') || '';
    var completeName = firstName + ' ' + lastName;
    completeName = completeName.trim().toLowerCase();
    user.set('completeName', completeName);
}

function setUserSanitizedSkills(user) {
    var skills = user.get('skills') || [];
    var sanitizedSkills = new Array(skills.length);
    for (var i = 0; i < skills.length; i++) {
        sanitizedSkills[i] = diacritics.removeDiacritics(skills[i]);
    }
    user.set('sanitizedSkills', sanitizedSkills);
}

const beforeSave = async (req, resp) => {
    req.master = true;
    const object = req.object;
    try {
        const authData = object.get('authData');
        if (!authData){
            resp.success();
        } else {
            const fbData = authData.facebook;

            const url = `https://graph.facebook.com/v3.2/${fbData.id}?fields=email%2Cfirst_name%2Clast_name%2Clocation&access_token=${fbData.access_token}`;
            const response = await (await fetch(url)).json();

            object.set('email', response.email);
            object.set('firstName', response.first_name);
            object.set('lastName', response.last_name);

            resp.success();
        }
    } catch (e) {
        resp.error(e.message);
    }
};

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
    var user = request.object;

    setUserCompleteName(user);
    setUserSanitizedSkills(user);

    response.success();
});

module.exports = {
    beforeSave
};