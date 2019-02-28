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
    let skills = user.get('skills') || [];
    let sanitizedSkills = new Array(skills.length);

    for (let i = 0; i < skills.length; i++) {
        sanitizedSkills[i] = diacritics.removeDiacritics(skills[i]);
    }
    user.set('sanitizedSkills', sanitizedSkills);
};

const getFacebookData = async user => {
    const authData = user.get('authData');
    if (!authData) {
        return;
    }

    const fbData = authData.facebook;

    const url = `https://graph.facebook.com/v3.2/${fbData.id}?fields=email%2Cfirst_name%2Clast_name%2Clocation&access_token=${fbData.access_token}`;
    const response = await (await fetch(url)).json();

    user.set('email', response.email);
    user.set('firstName', response.first_name);
    user.set('lastName', response.last_name);
};

const beforeSave = async (user) => {
    try {
        await getFacebookData(user);
        setUserCompleteName(user);
        setUserSanitizedSkills(user);
    } catch (e) {
        throw e;
    }
};

module.exports = {
    beforeSave
    /* BEGIN_DEBUG */,
    setUserCompleteName
    /* END_DEBUG */
};
