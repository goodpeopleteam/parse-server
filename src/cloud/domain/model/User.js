const _ = require("lodash");
const Talent = require("./Talent");

const emailKey = 'email';
const firstNameKey = 'firstName';
const lastNameKey = 'lastName';

function getUserTalents(x) {
    if (x.get('talents'))
        return x.get('talents').map(Talent.map);

    if (x.get('skills')) {
        return x.get('skills').map(t => {
            return { name: t }
        });
    }

    return [];
}

const mapFromParse = (loggedUser, parseUser) => {
    const isFavorite = _.find(loggedUser.get('favorites'), f => f.id === parseUser.id) !== undefined;

    return {
        id: parseUser.id,
        firebaseDeviceToken: parseUser.get('firebaseDeviceToken') || '',
        isOwnProfile: loggedUser.id === parseUser.id,
        isComplete: !!parseUser.get(emailKey) && !!parseUser.get(firstNameKey) && !!parseUser.get(lastNameKey),
        email: parseUser.get(emailKey),
        firstName: parseUser.get(firstNameKey),
        lastName: parseUser.get(lastNameKey),
        about: parseUser.get('about'),
        talents: getUserTalents(parseUser),
        isFavorite: isFavorite,
        favorites: parseUser.get('favorites') || [],
        profilePictureUrl: getProfilePictureUrl(parseUser),
        views: parseUser.get('views'),
        location: {
            position: parseUser.get('userPosition'),
            location: parseUser.get('location'),
            country: parseUser.get('country'),
            city: parseUser.get('city')
        }
    };
};

const getProfilePictureUrl = (parseProfile) => {
    const authData = parseProfile.get('authData');
    if (!authData) {
        const profilePicture = parseProfile.get('profilePicture');
        if (!profilePicture)
            return '';

        return profilePicture.url();
    }

    const facebookId = authData.facebook.id;
    if (facebookId)
        return getFacebookPictureUrl(facebookId);
};

const getFacebookPictureUrl = (facebookId) => {
    return `https://graph.facebook.com/${facebookId}/picture?type=large`;
};

module.exports = {
    EmailKey: emailKey,
    FirstNameKey: firstNameKey,
    LastNameKey: lastNameKey,
    mapFromParse,
    getProfilePictureUrl
};