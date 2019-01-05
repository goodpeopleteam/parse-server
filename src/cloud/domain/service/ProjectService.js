const Project = require('../model/Project');
const QueryCreator = require('../helpers/QueryCreator');

const CLASS_NAME = 'Projects';

const createProjectQuery = () => {
    return QueryCreator.createQuery(CLASS_NAME);
};

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

const getById = async (id) => {
    try {
        const query = createProjectQuery();

        return Project.mapFromParse(await query.get(id));
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const get = async (page) => {
    const pageSize = 20;

    try {
        const projectQuery = createProjectQuery();

        projectQuery.limit(10);
        projectQuery.skip(pageSize * page);
        projectQuery.include("user", { userMasterKey: true });

        return await projectQuery.find({ useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const getUsersProjects = async (userId) => {
    try {
        const projectQuery = createProjectQuery();

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

const search = async (term) => {
    try {
        const query = createProjectQuery();

        query.fullText('title', term);
        query.fullText('description', term);

        return await query.find();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

module.exports = {
    add,
    getById,
    get,
    getUsersProjects,
    search
};