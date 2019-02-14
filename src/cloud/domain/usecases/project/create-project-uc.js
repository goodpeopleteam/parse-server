const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (user, projectParam) => {
    const project = await ProjectService.add({
        data: {
            title: projectParam.title,
            description: projectParam.description,
            requiredTalents: projectParam.requiredTalents,
            user: user
        }
    });

    return Project.mapFromParseV1(project);
};
