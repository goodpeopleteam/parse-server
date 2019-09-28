const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (loggedUser, projectParam) => {
    let project = await ProjectService.add({
        data: {
            title: projectParam.title,
            description: projectParam.description,
            requiredTalents: projectParam.requiredTalents,
            user: loggedUser
        }
    });

    project = await ProjectService.getById(project.id);
    return Project.mapFromParseV1(project, loggedUser);
};
