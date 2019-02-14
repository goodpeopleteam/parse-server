const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");

module.exports.execute = async (term) => {
    const searchResult = await ProjectService.search(term);
    return searchResult.map(Project.mapFromParseV1);
};
