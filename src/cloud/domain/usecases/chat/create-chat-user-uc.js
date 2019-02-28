const ChatService = require("../../service/ChatService");
const UserService = require("../../service/UserService");
const User = require("../../model/User");

module.exports.execute = async (user) => {
    const profile = await UserService.getById(user.id);
    await ChatService.createUser(User.mapFromParse(profile));
};
