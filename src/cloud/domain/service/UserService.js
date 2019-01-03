const QueryCreator = require('../helpers/QueryCreator');

const get = async (id) => {
    try {
        return await QueryCreator.createQuery('User')
            .get(id, {useMasterKey: true});
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const find = async (skip) => {
    try {
        const userQuery = QueryCreator.createQuery('User');
        userQuery.skip(skip);

        return await userQuery
            .find({useMasterKey: true});
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const count = async () => {
    try {
        return await QueryCreator.createQuery('User')
            .count();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

module.exports = {
    get,
    find,
    count
};