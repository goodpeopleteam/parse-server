const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (user, page) => {
    const parseProjects = await ProjectService.get(user.id, page);
    return parseProjects.map(p=> Project.mapFromParseV1(p, user));
};
