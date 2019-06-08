const UserService = require("../../service/UserService");
const ChatService = require("../../service/ChatService");
const User = require("../../model/User");

module.exports.execute = async (conversationType, user, recipientId) => {
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

    const existingChatRoom = await ChatService.getChatRoom(conversationType, senderProfile.email, recipientProfile.email);
    if (existingChatRoom.exists) {
        const room = existingChatRoom.data();

        return {
            roomPath: room["roomRef"]["path"]
        };
    } else {
        const chatRoom = await ChatService.createChatRoom(conversationType, senderProfile.email, recipientProfile.email);

        await Promise.all([
            ChatService.addChatRoomToUser(conversationType, senderProfile, recipientProfile, chatRoom),
            ChatService.addChatRoomToUser(conversationType, recipientProfile, senderProfile, chatRoom)
        ]);

        return {
            roomPath: chatRoom.path
        };
    }
};
