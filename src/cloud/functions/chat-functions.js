const profileService = require('../domain/service/ProfileService');
const chatService = require('../domain/service/ChatService');
const Profile = require('../domain/model/Profile');

const createUser = async (req, res) => {
    try {
        const savedProfile = req.object;
        await chatService.createUser(Profile.mapFromParse(savedProfile));

        res.success();
    } catch (e) {
        res.error(e.message);
    }
};

const createChatRoom = async (req, res) => {
    try {
        const senderId = req.user.id;
        const recipientId = req.params.recipientId;

        const result = await Promise.all([
            profileService.getByUserId(senderId),
            profileService.getByUserId(recipientId)
        ]);

        const senderProfile = result[0];
        const recipientProfile = result[1];

        const chatRoomRef = await chatService.createChatRoom(senderProfile.email, recipientProfile.email);

        await Promise.all([
            chatService.addChatRoomToUser(senderProfile, recipientProfile, chatRoomRef),
            chatService.addChatRoomToUser(recipientProfile, senderProfile, chatRoomRef)
        ]);

        res.success({
            message: 'chat room created',
            chatRoomReference: chatRoomRef.path
        });
    } catch (e) {
        res.error(e.message);
    }
};

const getUserChatRooms = async (req, res) => {
    try {
        const rooms = await chatService.getUserChatRooms(req.user.id);
        res.success(rooms);
    } catch (e) {
        res.error(e.message);
    }
};

module.exports = {
    createChatRoom,
    getUserChatRooms,
    createUser
};