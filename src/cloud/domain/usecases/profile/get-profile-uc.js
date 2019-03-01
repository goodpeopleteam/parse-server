const UserService = require("../../service/UserService");
const _ = require("lodash");
const User = require("../../model/User");

module.exports.execute = async (user, profileId) => {
    const profile = await UserService.getById(profileId);

    if (user.id !== profileId) {
        profile.increment('views');
        profile.save(null, { useMasterKey: true });
    }
    
    profile.isOwnProfile = user.id === profileId;

    if (!profile.isOwnProfile) {
        profile.isFavorite = _.find(user.get('favorites'), f => f.id === profileId) !== undefined;
    } else {
        profile.isFavorite = false;
    }

    return User.mapFromParse(profile);
};
