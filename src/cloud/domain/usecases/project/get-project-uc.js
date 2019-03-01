const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (user, id) => {
    const project = await ProjectService.getById(id);

    if (project.get('user').id !== user.id) {
        project.increment('views');
        project.save();
    }

    return Project.mapFromParseV1(project, user);
};
