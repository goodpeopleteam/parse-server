const UserService = require("../../service/UserService");
const User = require("../../model/User");

const getById = async (loggedUser, profileId) => {
    const profile = await UserService.getById(profileId);

    return User.mapFromParse(loggedUser, profile);
};

const getByEmail = async (loggedUser, profileEmail) => {
    const profile = await UserService.getByEmail(profileEmail);
    if(!profile) {
        return null;
    }

    return User.mapFromParse(loggedUser, profile);
};

module.exports = {
    getById,
    getByEmail
};
