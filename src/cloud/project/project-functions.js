const QueryCreator = require('../domain/helpers/QueryCreator');
const Project = require('../domain/model/Project');

const PROJECT_CLASS_NAME = 'Projects';
const USER_CLASS_NAME = 'User';

module.exports.create = (req, res) => {
    const userId = req.params.userId;
    const projectParam = req.params.project;

    const ParseProject = Parse.Object.extend(PROJECT_CLASS_NAME);

    QueryCreator.createQuery(USER_CLASS_NAME)
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

module.exports.get = async (req, res) => {
    const ParseProject = Parse.Object.extend(PROJECT_CLASS_NAME);
    const query = new Parse.Query(ParseProject);

    query.limit(10);

    const parseProjects = await query.find();
    const projects = parseProjects.map(p => Project.mapFromParse(p));

    res.success(projects);
};

module.exports.getById = (req, res) => {
    const id = req.params.id;

    const ParseProject = Parse.Object.extend(PROJECT_CLASS_NAME);
    const query = new Parse.Query(ParseProject);

    query.get(id)
        .then(p => Project.mapFromParse(p))
        .then(project => res.success(project));
};

module.exports.myProjects = (req, res) => {
    const userId = req.params.userId;

    const projectQuery = QueryCreator.createQuery(PROJECT_CLASS_NAME);
    const userQuery = QueryCreator.createQuery(USER_CLASS_NAME);

    userQuery
        .get(userId)
        .then(user => {
            projectQuery.equalTo('user', user);
            projectQuery.descending('create_at');

            projectQuery
                .find()
                .then(projects => res.success(projects.map(Project.mapFromParse)))
                .catch(e => res.error(e))
        }).catch(e => res.error(e))
};
