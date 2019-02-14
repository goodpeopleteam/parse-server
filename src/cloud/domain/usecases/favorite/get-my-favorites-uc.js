const UserService = require("../../service/UserService");
const User = require("../../model/User");

module.exports.execute = async (user) => {
    const favoriteEntries = user.get('favorites') || [];
    if (favoriteEntries.length === 0) {
        return [];
    }

    const userQueries = [];
    for (let i = 0; i < favoriteEntries.length; i++) {
        userQueries.push(UserService.getById(favoriteEntries[i].id));
    }

    const parseUsers = await Promise.all(userQueries);
    return parseUsers.map(User.mapFromParse);
};
