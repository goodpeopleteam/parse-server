const UserService = require('../domain/service/UserService');
const ChatService = require('../domain/service/ChatService');
const Profile = require('../domain/model/Profile');

const createUser = async (req) => {
    try {
        const savedProfile = req.object;
        await ChatService.createUser(Profile.mapFromParse(savedProfile));
    } catch (e) {
        throw e;
    }
};

const startChat = async (req) => {
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
            return {
                roomPath: existingChatRoom.data()["ref"]["path"],
                roomAvatar: existingChatRoom.data()["roomAvatar"]
            };
        } else {
            const chatRoomRef = await ChatService.createChatRoom(senderProfile.email, recipientProfile.email);

            await Promise.all([
                ChatService.addChatRoomToUser(senderProfile, recipientProfile, chatRoomRef),
                ChatService.addChatRoomToUser(recipientProfile, senderProfile, chatRoomRef)
            ]);

            return {
                roomPath: chatRoomRef.path,
                roomAvatar: recipientProfile.profilePictureUrl
            };
        }
    } catch (e) {
        throw e;
    }
};

module.exports = {
    startChat,
    createUser
};