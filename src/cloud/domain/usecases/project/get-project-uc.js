const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (user, id) => {
    const project = await ProjectService.getById(id);
    return Project.mapFromParseV1(project, user);
};
