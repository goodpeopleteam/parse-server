const User = require('../../model/User');
const UserService = require("../../service/UserService");

module.exports.execute = async (user, params) => {
    if (!params) {
        throw Error("Params must be defined");
    }

    user.set(User.EmailKey, params.email);
    user.set(User.FirstNameKey, params.firstName);
    user.set(User.LastNameKey, params.lastName);

    await user.save(null, { useMasterKey: true });

    const updatedProfile = await UserService.getByEmail(params.email);

    return User.mapFromParse(user, updatedProfile);
};
