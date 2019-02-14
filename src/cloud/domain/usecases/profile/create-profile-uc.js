const ProfileService = require('../../service/ProfileService');

module.exports.execute = async (user, profile) => {
    return await ProfileService.add({
        user,
        email: user.getEmail(),
        firstName: profile.firstName,
        lastName: profile.lastName
    });
};
