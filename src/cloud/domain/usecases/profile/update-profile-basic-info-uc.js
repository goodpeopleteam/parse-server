const User = require('../../model/User');

module.exports.execute = async (user, params) => {
    if (!params) {
        throw Error("Params must be defined");
    }

    user.set(User.EmailKey, params.email);
    user.set(User.FirstNameKey, params.firstName);
    user.set(User.LastNameKey, params.lastName);

    return await user.save(null, { useMasterKey: true });
};
