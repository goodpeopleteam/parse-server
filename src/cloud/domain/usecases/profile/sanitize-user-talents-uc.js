const diacritics = require('../../../domain/helpers/Diacritics');

module.exports.execute = user => {
    let skills = user.get('skills') || [];
    let sanitizedSkills = new Array(skills.length);

    for (let i = 0; i < skills.length; i++) {
        sanitizedSkills[i] = diacritics.removeDiacritics(skills[i]);
    }
    user.set('sanitizedSkills', sanitizedSkills);
};