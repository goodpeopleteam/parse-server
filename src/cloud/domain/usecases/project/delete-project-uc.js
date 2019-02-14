const ProjectService = require("../../service/ProjectService");

module.exports.execute = async (user, projectId) => {
    const project = await ProjectService.getById(projectId);
    await project.destroy();
};
