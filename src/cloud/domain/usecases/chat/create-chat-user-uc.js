const ChatService = require("../../service/ChatService");
const UserService = require("../../service/UserService");
const User = require("../../model/User");

module.exports.execute = async (loggedUser) => {
    const profile = await UserService.getById(loggedUser.id);
    await ChatService.createUser(User.mapFromParse(loggedUser, profile));
};
