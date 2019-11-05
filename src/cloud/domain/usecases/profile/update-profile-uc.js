const User = require("../../model/User");
const UserService = require("../../service/UserService");

module.exports.execute = async (user, fieldToUpdate, value) => {
    if (!fieldToUpdate) {
        throw Error("field must be defined");
    }

    if (!value) {
        throw Error("value must be defined");
    }

    user.set(fieldToUpdate, value);
    await user.save(null, { useMasterKey: true });

    const updatedProfile = await UserService.getByEmail(user.get('email'));

    return User.mapFromParse(user, updatedProfile);
};
