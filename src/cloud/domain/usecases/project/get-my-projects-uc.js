const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (user) => {
    const result = await ProjectService.getUsersProjects(user);
    return result.map(Project.mapFromParseV1);
};
