const Project = require('../model/Project');
const QueryCreator = require('../helpers/QueryCreator');

const CLASS_NAME = 'Projects';

const add = async (params) => {
    try {
        const ParseProject = Parse.Object.extend(CLASS_NAME);
        const p = new ParseProject();

        p.set('title', params.data.title);
        p.set('description', params.data.description);
        p.set('requiredTalents', params.data.requiredTalents);
        p.set('user', params.user);
        p.set('profile', params.profile);

        return await p.add();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const get = async (id) => {
    try {
        const ParseProject = Parse.Object.extend(CLASS_NAME);
        const query = new Parse.Query(ParseProject);

        return Project.mapFromParse(await query.get(id));
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const fetch = async () => {
    try {
        const projectQuery = QueryCreator.createQuery(CLASS_NAME);

        projectQuery.limit(10);

        return await projectQuery.find();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const getUsersProjects = async (userId) => {
    try {
        const projectQuery = QueryCreator.createQuery(CLASS_NAME);

        const user = new Parse.User();
        user.id = userId;

        projectQuery.equalTo('user', user);
        projectQuery.descending('createdAt');

        return await projectQuery.find();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

module.exports = {
    add,
    get,
    fetch,
    getUsersProjects
};