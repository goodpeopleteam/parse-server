const ProjectHooks = require("../../hooks/project-hooks");
const PopulateTalents = require("../../domain/usecases/talent/populate-talents-if-new-uc");

Parse.Cloud.beforeSave('Projects', async (req) => {
    try {
        const proj = req.object;

        await Promise.all([
            PopulateTalents.execute(proj, 'requiredTalents', proj.get('skillsNeeded'))
        ]);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.afterSave('Projects', async (req) => {
    try {
        const proj = req.object;

        await Promise.all([
            ProjectHooks.afterSave(proj)
        ]);
    } catch (e) {
        console.log(e);
    }
});