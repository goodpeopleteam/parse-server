const ProfileJobs = require("../../jobs/ProfileJobs");
const ProjectJobs = require("../../jobs/ProjectJobs");
const ProjectService = require("../../domain/service/ProjectService");
const UserService = require("../../domain/service/UserService");
const JobBase = require("../../jobs/job-base").JobBase;

Parse.Cloud.job('mapProfiles', ProfileJobs.MapProfiles);
Parse.Cloud.job('fixProjectUserReference', ProjectJobs.FixProjectUserReference);
Parse.Cloud.job('normalizeProjects', ProjectJobs.normalizeProjects);

Parse.Cloud.job('refresh projects', async (req) => {
    const projectCount = ProjectService.count;
    const promises = await JobBase(projectCount, "Projects", async p => {
        return p.save();
    });

    await Promise.all(promises);
});

Parse.Cloud.job('refresh profiles', async (req) => {
    const profileCount = UserService.count;
    const createTalentsFromProfilePromises = await JobBase(profileCount, "User", async p => {
        return p.save(null, { useMasterKey: true });
    });

    await Promise.all(createTalentsFromProfilePromises);
});

Parse.Cloud.job('refresh user and projects', async (req, status) => {
    const projectCount = ProjectService.count;
    const createTalentsFromProjectPromises = await JobBase(projectCount, "Projects", async p => {
        return p.save();
    });

    await Promise.all(createTalentsFromProjectPromises);

    const profileCount = UserService.count;
    const createTalentsFromProfilePromises = await JobBase(profileCount, "User", async p => {
        return p.save(null, { useMasterKey: true });
    });

    await Promise.all(createTalentsFromProfilePromises);
});