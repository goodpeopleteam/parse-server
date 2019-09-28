const UserService = require("../../service/UserService");
const User = require("../../model/User");

function processProfile(loggedUser, profile) {
    // profile.isOwnProfile = profile.id === loggedUser.id;

    if (!profile.isOwnProfile) {
        profile.increment('views');
        profile.save(null, { useMasterKey: true });
        // profile.isFavorite = _.find(loggedUser.get('favorites'), f => f.id === profile.id) !== undefined;
    }
}

const getById = async (loggedUser, profileId) => {
    const profile = await UserService.getById(profileId);
    processProfile(loggedUser, profile);

    return User.mapFromParse(loggedUser, profile);
};

const getByEmail = async (loggedUser, profileEmail) => {
    const profile = await UserService.getByEmail(profileEmail);
    if(!profile) {
        return null;
    }

    processProfile(loggedUser, profile);
    return User.mapFromParse(loggedUser, profile);
};

module.exports = {
    getById,
    getByEmail
};
