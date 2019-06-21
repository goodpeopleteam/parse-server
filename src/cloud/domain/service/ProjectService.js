const QueryCreator = require('../helpers/QueryCreator');
const CLASS_NAME = 'Projects';
const PAGE_SIZE = 20;

const createQuery = () => {
    const query = QueryCreator.createQuery(CLASS_NAME);
    query.include('user');
    query.include("user.talents");
    query.include("requiredTalents");
    return query;
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
        return await createQuery().get(id, { useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const get = async (userId, page) => {
    try {
        const projectQuery = createQuery();

        projectQuery.limit(10);
        projectQuery.skip(PAGE_SIZE * page);

        projectQuery.descending('priority');
        projectQuery.addDescending('createdAt');

        return await projectQuery.find({ useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const getUsersProjects = async (user) => {
    try {
        const projectQuery = createQuery();

        projectQuery.equalTo('user', user);
        projectQuery.descending('createdAt');

        return await projectQuery.find({ useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const count = async () => {
    return await createQuery().count();
};

module.exports = {
    add,
    getById,
    get,
    getUsersProjects,
    count,
    createQuery
};
