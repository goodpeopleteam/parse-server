const QueryCreator = require('../domain/helpers/QueryCreator');
const Project = require('../domain/model/Project');
const CLASS_NAME = 'Project';

module.exports.create = (req, res) => {
    const userId = req.params.userId;
    const projectParam = req.params.project;

    const ParseProject = Parse.Object.extend(CLASS_NAME);

    QueryCreator.createQuery('User')
        .get(userId)
        .then(user => {
            const p = new ParseProject();

            p.set('title', projectParam.title);
            p.set('description', projectParam.description);
            p.set('requiredTalents', projectParam.requiredTalents);
            p.set('user', user);

            p.save()
                .then(p => res.success(Project.mapFromParse(p)))
                .catch(e => res.error(e))
        }).catch(e => res.error(e))
};

module.exports.get = (req, res) => {
    const ParseProject = Parse.Object.extend(CLASS_NAME);
    const query = new Parse.Query(ParseProject);

    query.limit(10);

    query.find()
        .then(projects => projects.map(p => Project.mapFromParse(p)))
        .then(projects => res.success(projects));
};

module.exports.getById = (req, res) => {
    const id = req.params.id;

    const ParseProject = Parse.Object.extend(CLASS_NAME);
    const query = new Parse.Query(ParseProject);

    query.get(id)
        .then(p => Project.mapFromParse(p))
        .then(project => res.success(project));
};
