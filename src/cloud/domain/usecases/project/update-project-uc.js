const ProjectService = require("../../service/ProjectService");

module.exports.execute = async (user, projectId, fieldToUpdate, value) => {
    const proj = await ProjectService.getById(projectId);
    proj.set(fieldToUpdate, value);
    return await proj.save();
};
