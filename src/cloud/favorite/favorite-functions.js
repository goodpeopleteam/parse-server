const _ = require('lodash');
const QueryCreator = require('../domain/helpers/QueryCreator');

const USER_FAVORITE_CLASS_NAME = 'UserFavorite';

module.exports.add = async (req, res) => {
    const userId = req.user.id;
    const favoriteId = req.params.favoriteId;

    const favorite = await QueryCreator.createQuery('User')
        .get(favoriteId);

    const userFavoriteQuery = QueryCreator.createQuery(USER_FAVORITE_CLASS_NAME);
    userFavoriteQuery.equalTo('userId', userId.id);

    const existingFavorite = await userFavoriteQuery.first();

    try {
        if (!existingFavorite) {
            const UserFavoriteClass = Parse.Object.extend(USER_FAVORITE_CLASS_NAME);
            const userFavorite = new UserFavoriteClass();

            userFavorite.set('userId', userId.id);
            userFavorite.set('favorites', [favorite]);

            await userFavorite.save();
        } else {
            const existingFavorites = existingFavorite.get('favorites');
            existingFavorites.push(favorite);

            await existingFavorite.save();
        }

        res.success('success');
    } catch (e) {
        res.error(e.message);
    }
};

module.exports.hasFavorite = async (req, res) => {
    const userId = req.user.id;
    const favoriteId = req.params.favoriteId;

    try {
        const userFavoriteQuery = QueryCreator.createQuery(USER_FAVORITE_CLASS_NAME);
        userFavoriteQuery.equalTo('userId', userId);

        const existingFavorite = await userFavoriteQuery.first();

        if (!existingFavorite) {
            res.success(false);
        } else {
            const isFavorite = _.find(existingFavorite.get('favorites'), f => f.id === favoriteId);
            res.success(isFavorite);
        }
    } catch (e) {
        res.error(e.message);
    }
};