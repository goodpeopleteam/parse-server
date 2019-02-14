const ChatService = require("../../service/ChatService");
const Profile = require("../../model/Profile");

module.exports.execute = async (savedProfile) => {
    await ChatService.createUser(Profile.mapFromParse(savedProfile));
};
