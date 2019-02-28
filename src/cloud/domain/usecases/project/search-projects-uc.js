const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (user, term) => {
    const searchResult = await ProjectService.search(term);
    return searchResult.map(p => Project.mapFromParseV1(p, user));
};
