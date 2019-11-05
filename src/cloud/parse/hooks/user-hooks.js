const CreateChatUserUc = require("../../domain/usecases/chat/create-chat-user-uc");
const GetFacebookDataUc = require("../../domain/usecases/profile/get-facebook-data-uc");
const SetUserCompleteNameUc = require("../../domain/usecases/profile/set-user-complete-name-uc");
const SanitizeUserTalentsUc = require("../../domain/usecases/profile/sanitize-user-talents-uc");
const PopulateTalentsUc = require("../../domain/usecases/talent/populate-talents-if-new-uc");


Parse.Cloud.beforeSave(Parse.User, async (req) => {
    try {
        const user = req.object;

        await Promise.all([
            GetFacebookDataUc.execute(user),
            SanitizeUserTalentsUc.execute(user)
        ]);

        await Promise.all([
            SetUserCompleteNameUc.execute(user),
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