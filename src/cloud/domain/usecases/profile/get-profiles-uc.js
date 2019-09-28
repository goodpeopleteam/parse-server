const UserService = require("../../service/UserService");
const User = require("../../model/User");

module.exports.execute = async (loggedUser, page) => {
    const parseUsers = await UserService.get(loggedUser.id, page);
    return parseUsers.map(u => User.mapFromParse(loggedUser, u));
};
