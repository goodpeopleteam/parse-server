const ProfileJobs = require("../../jobs/ProfileJobs");
const ProjectJobs = require("../../jobs/ProjectJobs");

Parse.Cloud.job('mapProfiles', ProfileJobs.MapProfiles);
Parse.Cloud.job('fixProjectUserReference', ProjectJobs.FixProjectUserReference);
Parse.Cloud.job('normalizeProjects', ProjectJobs.normalizeProjects);