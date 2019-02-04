const profileService = require('../domain/service/ProfileService');
const UserService = require('../domain/service/UserService');
const ChatService = require('../domain/service/ChatService');
const Profile = require('../domain/model/Profile');

const createUser = async (req, res) => {
    try {
        const savedProfile = req.object;
        await ChatService.createUser(Profile.mapFromParse(savedProfile));

        res.success();
    } catch (e) {
        res.error(e.message);
    }
};

const startChat = async (req, res) => {
    try {
        const senderId = req.user.id;
        const recipientId = req.params.recipientId;

        const result = await Promise.all([
            UserService.getById(senderId),
            UserService.getById(recipientId)
        ]);

        const senderProfile = result[0];
        const recipientProfile = result[1];

        const existingChatRoom = await ChatService.getChatRoom(senderProfile.email, recipientProfile.email);
        if (existingChatRoom.exists) {
            res.success({
                roomPath: existingChatRoom.data()["ref"]["path"],
                roomAvatar: existingChatRoom.data()["roomAvatar"]
            });
        } else {
            const chatRoomRef = await ChatService.createChatRoom(senderProfile.email, recipientProfile.email);

            await Promise.all([
                ChatService.addChatRoomToUser(senderProfile, recipientProfile, chatRoomRef),
                ChatService.addChatRoomToUser(recipientProfile, senderProfile, chatRoomRef)
            ]);

            res.success({
                roomPath: chatRoomRef.path,
                roomAvatar: recipientProfile.profilePictureUrl
            });
        }
    } catch (e) {
        res.error(e.message);
    }
};

const getUserChatRooms = async (req, res) => {
    try {
        const rooms = await ChatService.getUserChatRooms(req.user.id);
        res.success(rooms);
    } catch (e) {
        res.error(e.message);
    }
};

module.exports = {
    startChat,
    getUserChatRooms,
    createUser
};