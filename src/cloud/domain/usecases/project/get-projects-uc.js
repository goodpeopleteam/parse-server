const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (loggedUser, page) => {
    const parseProjects = await ProjectService.get(loggedUser.id, page);
    return parseProjects.map(p=> Project.mapFromParseV1(p, loggedUser));
};
