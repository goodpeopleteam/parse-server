const User = require('../model/User');
const QueryCreator = require('../helpers/QueryCreator');

const get = async (page) => {
    const pageSize = 20;

    try {
        const query = QueryCreator.createQuery('User');

        query.limit(pageSize);
        query.skip(page * pageSize);
        query.descending('createdAt');

        const profiles = await query.find({useMasterKey: true});

        return profiles.map(u => User.mapFromParse(u));
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const getById = async (id) => {
    try {
        return await QueryCreator.createQuery('User')
            .get(id, {useMasterKey: true});
    } catch (e) {
        console.log(e.message);
        return null;
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
    getById,
    find,
    count
};