const QueryCreator = require('../helpers/QueryCreator');
const CLASS_NAME = 'Projects';
const PAGE_SIZE = 20;

const createProjectQuery = () => {
    return QueryCreator.createQuery(CLASS_NAME);
};

const add = async (params) => {
    try {
        const ParseProject = Parse.Object.extend(CLASS_NAME);
        const p = new ParseProject();

        p.set('title', params.data.title);
        p.set('detailedDescription', params.data.description);
        p.set('description', params.data.description);
        p.set('skillsNeeded', params.data.requiredTalents);
        p.set('user', params.data.user);

        return await p.save();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const getById = async (id) => {
    try {
        const query = createProjectQuery();
        query.include("user");

        return await query.get(id, { useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const get = async (userId, page) => {
    try {
        const projectQuery = createProjectQuery();

        const user = new Parse.User();
        user.id = userId;

        projectQuery.notEqualTo("user", user);
        projectQuery.limit(10);
        projectQuery.skip(PAGE_SIZE * page);
        projectQuery.include("user", { userMasterKey: true });

        return await projectQuery.find({ useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const getUsersProjects = async (user) => {
    try {
        const projectQuery = createProjectQuery();

        projectQuery.include("user");
        projectQuery.equalTo('user', user);
        projectQuery.descending('createdAt');

        return await projectQuery.find({ useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const search = async (term) => {
    try {
        const query = createProjectQuery();

        query.include('user');
        query.fullText('title', term);
        query.fullText('description', term);

        return await query.find({ useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const count = async () => {
    return await createProjectQuery().count();
};

module.exports = {
    add,
    getById,
    get,
    getUsersProjects,
    search,
    count
};
