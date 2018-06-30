const QueryCreator = require('../domain/helpers/QueryCreator');
const Project = require('../domain/model/Project');

const PROJECT_CLASS_NAME = 'Projects';
const USER_CLASS_NAME = 'User';
const PROFILE_CLASS_NAME = 'Profile';

module.exports.create = async (req, res) => {
    const userId = req.params.userId;
    const projectParam = req.params.project;

    const user = new Parse.User();
    user.id = userId;

    const userQuery = QueryCreator.createQuery(USER_CLASS_NAME);

    const profileQuery = QueryCreator.createQuery(PROFILE_CLASS_NAME);
    profileQuery.equalTo('user', user);

    const result = await Parse.Promise.when([userQuery.get(userId), profileQuery.first()]);

    const ParseProject = Parse.Object.extend(PROJECT_CLASS_NAME);
    const p = new ParseProject();

    p.set('title', projectParam.title);
    p.set('description', projectParam.description);
    p.set('requiredTalents', projectParam.requiredTalents);
    p.set('user', result[0]);
    p.set('profile', result[1]);

    const project = await p.save();
    res.success(project);
};

module.exports.get = async (req, res) => {
    const projectQuery = QueryCreator.createQuery(PROJECT_CLASS_NAME);

    projectQuery.limit(10);

    try {
        const parseProjects = await projectQuery.find();
        const mappedProjects = [];

        for (let i = 0; i < parseProjects.length; i++) {
            const parseProject = parseProjects[i];
            const projectProfile = await parseProject.get('profile').fetch();

            mappedProjects.push(Project.mapFromParse(parseProject, projectProfile));
        }

        res.success(mappedProjects);
    } catch (e) {
        res.error(e.message);
    }
};

module.exports.getById = (req, res) => {
    const id = req.params.id;

    const ParseProject = Parse.Object.extend(PROJECT_CLASS_NAME);
    const query = new Parse.Query(ParseProject);

    query.get(id)
        .then(p => Project.mapFromParse(p))
        .then(project => res.success(project));
};

module.exports.myProjects = async (req, res) => {
    const userId = req.params.userId;

    const projectQuery = QueryCreator.createQuery(PROJECT_CLASS_NAME);
    const profileQuery = QueryCreator.createQuery(PROFILE_CLASS_NAME);

    const user = new Parse.User();
    user.id = userId;

    profileQuery.equalTo('user', user);

    projectQuery.equalTo('user', user);
    projectQuery.descending('createdAt');

    const result = await Parse.Promise.when([profileQuery.first(), projectQuery.find()]);

    const profile = result[0];
    const parseProjects = result[1];

    res.success(parseProjects.map(p => Project.mapFromParse(p, profile)));
};
