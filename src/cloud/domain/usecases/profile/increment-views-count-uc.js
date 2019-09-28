const UserService = require("../../service/UserService");

module.exports.execute = async (loggedUser, profileId) => {
    const profile = await UserService.getById(profileId);
    profile.increment('views');
    profile.save(null, { useMasterKey: true });
};
