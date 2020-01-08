const ProjectService = require("../../service/ProjectService");
const Project = require("../../model/Project");
const TalentService = require("../../service/TalentService");

module.exports.execute = async (loggedUser, term) => {
    const queries = [];

    const talents = await TalentService.search(term);

    for (const talent of talents) {
        const talentQuery = ProjectService.createQuery();
        talentQuery.equalTo('requiredTalents', talent);

        queries.push(talentQuery);
    }

    const projectTitleQuery = ProjectService.createQuery();
    projectTitleQuery.matches('title', RegExp(term, 'gi'));
    queries.push(projectTitleQuery);

    const projectDescriptionQuery = ProjectService.createQuery();
    projectDescriptionQuery.matches('description', RegExp(term, 'gi'));
    queries.push(projectDescriptionQuery);


    const compoundQuery = Parse.Query.or(...queries);
    compoundQuery.include('user');
    compoundQuery.include('user.talents');
    compoundQuery.include('requiredTalents');

    const projects = await compoundQuery.find({ useMasterKey: true });

    return projects.map(p => Project.mapFromParseV1(p, loggedUser));
};
