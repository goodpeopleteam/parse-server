const QueryCreator = require('../helpers/QueryCreator');

const CLASS_NAME = 'UserFavorite';

const getByUserId = async (userId) => {
    try {
        const userFavoriteQuery = QueryCreator.createQuery(CLASS_NAME);
        userFavoriteQuery.equalTo('userId', userId);

        return await userFavoriteQuery.first();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const addFavoriteToUser = async (userId, favorite) => {
    try {
        const UserFavoriteClass = Parse.Object.extend(CLASS_NAME);
        const userFavorite = new UserFavoriteClass();

        userFavorite.set('userId', userId);
        userFavorite.set('favorites', [favorite]);

        await userFavorite.add();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

module.exports = {
    getByUserId,
    addFavoriteToUser
};