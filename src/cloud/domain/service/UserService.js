const QueryCreator = require('../helpers/QueryCreator');

function createQuery() {
    const query = QueryCreator.createQuery('User');
    query.include('talents');
    return query;
}

const get = async (userId, page) => {
    const pageSize = 20;

    try {
        const query = createQuery();

        query.notEqualTo("objectId", userId);
        query.limit(pageSize);
        query.skip(page * pageSize);
        query.descending('createdAt');

        return await query.find({ useMasterKey: true });
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
        return null;
    }
};

const find = async (skip) => {
    try {
        const userQuery = createQuery();
        userQuery.skip(skip);

        return await userQuery
            .find({ useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const count = async () => {
    try {
        return await createQuery().count();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const search = async (term) => {
    try {
        const firstNameQuery = createQuery();
        firstNameQuery.fullText('firstName', term);

        const lastNameQuery = createQuery();
        lastNameQuery.fullText('lastName', term);

        const query = Parse.Query.or(firstNameQuery, lastNameQuery);
        query.descending('createdAt');

        return await query.find({ useMasterKey: true });
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

module.exports = {
    get,
    getById,
    find,
    count,
    search
};
