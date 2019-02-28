const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (user, projectId, fieldToUpdate, value) => {
    const proj = await ProjectService.getById(projectId);
    proj.set(fieldToUpdate, value);
    const savedProj = await proj.save();
    return Project.mapFromParseV1(savedProj, user);
};
