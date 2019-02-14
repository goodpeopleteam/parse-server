const UserService = require("../../service/UserService");
const ChatService = require("../../service/ChatService");

module.exports.execute = async (user, recipientId) => {
    const result = await Promise.all([
        UserService.getById(user.id),
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
};
