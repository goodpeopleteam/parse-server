const UserHooks = require("../../hooks/user-hooks");
const CreateChatUserUc = require("../../domain/usecases/chat/create-chat-user-uc");
const PopulateTalentsUc = require("../../domain/usecases/talent/populate-talents-if-new-uc");

Parse.Cloud.beforeSave(Parse.User, async (req) => {
    try {
        const user = req.object;

        await Promise.all([
            UserHooks.beforeSave(user),
            PopulateTalentsUc.execute(user, "talents", user.get('skills')),
        ]);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.afterSave(Parse.User, async (req) => {
    try {
        const user = req.object;

        await Promise.all([
            CreateChatUserUc.execute(user)
        ]);
    } catch (e) {
        console.log(e);
    }
});