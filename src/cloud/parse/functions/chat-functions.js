const StartConversationUc = require("../../domain/usecases/chat/start-conversation-uc");
const GenerateLayerTokenUc = require("../../domain/usecases/layer/generate-layer-token-uc");

Parse.Cloud.define('Chat_startChatWithUser', async (req) => {
    try {
        return await StartConversationUc.execute('userConversations', req.user, req.params.recipientId);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Chat_startChatForProject', async (req) => {
    try {
        return await StartConversationUc.execute('userConversations', req.user, req.params.recipientId);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('generateToken', GenerateLayerTokenUc.execute);