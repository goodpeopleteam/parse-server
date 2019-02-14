const UserService = require("../../service/UserService");
const User = require("../../model/User");

module.exports.execute = async (term) => {
    const parseUsers = await UserService.search(term);
    return parseUsers.map(User.mapFromParse);
};
