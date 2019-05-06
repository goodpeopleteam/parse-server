const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

function getOwnerId(project) {
    const owner = project.get('user');
    if(owner)
        return owner.id;

    return project.get('userID');
}

module.exports.execute = async (user, id) => {
    const project = await ProjectService.getById(id);

    if (getOwnerId(project) !== user.id) {
        project.increment('views');
        project.save();
    }

    return Project.mapFromParseV1(project, user);
};
