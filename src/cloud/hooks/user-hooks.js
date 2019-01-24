const fetch = require('node-fetch');
const diacritics = require('../domain/helpers/Diacritics');

const setUserCompleteName = user => {
    const firstName = user.get('firstName') || '';
    const lastName = user.get('lastName') || '';

    let completeName = firstName.trim() + ' ' + lastName.trim();

    completeName = completeName.toLowerCase();

    user.set('completeName', completeName);
};

const setUserSanitizedSkills = user => {
    var skills = user.get('skills') || [];
    var sanitizedSkills = new Array(skills.length);
    for (var i = 0; i < skills.length; i++) {
        sanitizedSkills[i] = diacritics.removeDiacritics(skills[i]);
    }
    user.set('sanitizedSkills', sanitizedSkills);
};

const getFacebookData = async (object, resp) => {
    const authData = object.get('authData');
    if (!authData) {
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
};

const beforeSave = async (req, resp) => {
    const user = req.object;

    try {
        setUserCompleteName(user);
        setUserSanitizedSkills(user);
        //await getFacebookData(object, resp);

        resp.success();
    } catch (e) {
        resp.error(e.message);
    }
};

module.exports = {
    beforeSave
    /* BEGIN_DEBUG */,
    setUserCompleteName
    /* END_DEBUG */
};
