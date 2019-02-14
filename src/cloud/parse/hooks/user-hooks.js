const UserHooks = require("../../hooks/user-hooks");

Parse.Cloud.beforeSave(Parse.User, async (req) => {
    try {
        await UserHooks.beforeSave(req.object);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.afterSave(Parse.User, async (req) => {
    try {
        await UserHooks.afterSave(req.object);
    } catch (e) {
        console.log(e);
    }
});