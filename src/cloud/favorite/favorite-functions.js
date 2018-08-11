const _ = require('lodash');
const QueryCreator = require('../domain/helpers/QueryCreator');
const Profile = require('../domain/model/Profile');

const USER_FAVORITE_CLASS_NAME = 'UserFavorite';

module.exports.add = async (req, res) => {
    const userId = req.user.id;
    const favoriteId = req.params.favoriteId;

    const favorite = await QueryCreator.createQuery('User')
        .get(favoriteId);

    const userFavoriteQuery = QueryCreator.createQuery(USER_FAVORITE_CLASS_NAME);
    userFavoriteQuery.equalTo('userId', userId);

    const existingFavorite = await userFavoriteQuery.first();

    try {
        if (!existingFavorite) {
            const UserFavoriteClass = Parse.Object.extend(USER_FAVORITE_CLASS_NAME);
            const userFavorite = new UserFavoriteClass();

            userFavorite.set('userId', userId);
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

module.exports.myFavorites = async (req, res) => {
    const userId = req.user.id;
    try {
        const myFavoritesQuery = QueryCreator.createQuery(USER_FAVORITE_CLASS_NAME);
        myFavoritesQuery.equalTo('userId', userId);

        const favoriteEntry = await myFavoritesQuery.first();
        const favoriteIds = favoriteEntry.get('favorites');

        const userQueries = [];
        for (let i = 0; i < favoriteIds.length; i++) {
            const user = new Parse.User();
            user.id = favoriteIds[i].id;

            const query = QueryCreator.createQuery('Profile');
            query.equalTo('user', user);

            userQueries.push(query.first());
        }

        const result = await Parse.Promise.when(userQueries);

        res.success(result.map(x => Profile.mapFromParse(x)));
    } catch (e) {
        res.error(e.message);
    }
};