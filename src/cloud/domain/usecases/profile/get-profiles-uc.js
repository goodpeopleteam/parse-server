const UserService = require("../../service/UserService");
const User = require("../../model/User");

module.exports.execute = async (user, page) => {
    const parseUsers = await UserService.get(user.id, page);
    return parseUsers.map(User.mapFromParse);
};
