const Chat = require("../../domain/service/ChatService");

Parse.Cloud.afterSave("Profile", async (req) => {
    try {
        await Chat.createUser(req.object);
    } catch (e) {
        console.log(e);
    }
});