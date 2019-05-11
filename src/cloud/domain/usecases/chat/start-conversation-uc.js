const UserService = require("../../service/UserService");
const ChatService = require("../../service/ChatService");
const User = require("../../model/User");

module.exports.execute = async (user, recipientId) => {
    const result = await Promise.all([
        UserService.getById(user.id),
        UserService.getById(recipientId)
    ]);

    const sender = result[0];
    const recipient = result[1];

    if (!sender.get('email') || !recipient.get('email')) {
        return null;
    }

    const senderProfile = User.mapFromParse(result[0]);
    const recipientProfile = User.mapFromParse(result[1]);

    await Promise.all([
        ChatService.createUser(senderProfile),
        ChatService.createUser(recipientProfile)
    ]);

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
