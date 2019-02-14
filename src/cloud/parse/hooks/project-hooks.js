const ProjectHooks = require("../../hooks/project-hooks");

Parse.Cloud.afterSave('Projects', async (req) => {
    try {
        await ProjectHooks.afterSave(req.object);
    } catch (e) {
        console.log(e);
    }
});