const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (loggedUser) => {
    const result = await ProjectService.getUsersProjects(loggedUser);
    return result.map(p => Project.mapFromParseV1(p, loggedUser));
};
