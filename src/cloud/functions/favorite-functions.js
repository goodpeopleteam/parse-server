const _ = require('lodash');
const Profile = require('../domain/model/Profile');
const User = require('../domain/model/User');
const UserService = require('../domain/service/UserService');
const FavoriteService = require('../domain/service/FavoriteService');
const ProfileService = require('../domain/service/ProfileService');

const add = async (req, res) => {
    const userId = req.user.id;
    const favoriteId = req.params.favoriteId;

    const favorite = await UserService.get(favoriteId);
    const existingFavorite = await FavoriteService.getByUserId(userId);

    try {
        if (!existingFavorite) {
            await FavoriteService.addFavoriteToUser(userId, favorite);
        } else {
            const existingFavorites = existingFavorite.get('favorites');
            existingFavorites.push(favorite);

            await existingFavorite.add();
        }

        res.success('success');
    } catch (e) {
        res.error(e.message);
    }
};

const hasFavorite = async (req, res) => {
    const userId = req.user.id;
    const favoriteId = req.params.favoriteId;

    try {
        const existingFavorite = await FavoriteService.getByUserId(userId);

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

const myFavorites = async (req, res) => {
    const userId = req.user.id;

    try {
        // database v2
        // const favoriteEntry = await FavoriteService.getByUserId(userId);
        // const favoriteIds = favoriteEntry.get('favorites');
        //
        // const userQueries = [];
        // for (let i = 0; i < favoriteIds.length; i++) {
        //     userQueries.push(UserService.getById(favoriteIds[i].id));
        // }
        //
        // const result = await Promise.when(userQueries);
        //
        // res.success(result.map(x => Profile.mapFromParse(x)));

        const favoriteEntries = req.user.get('favorites');

        const userQueries = [];
        for (let i = 0; i < favoriteEntries.length; i++) {
            userQueries.push(UserService.getById(favoriteEntries[i].id));
        }

        const result = await Promise.all(userQueries);

        res.success(result);

    } catch (e) {
        res.error(e.message);
    }
};

module.exports = {
    add,
    hasFavorite,
    myFavorites
};