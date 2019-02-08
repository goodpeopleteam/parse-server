const _ = require('lodash');
const UserService = require('../domain/service/UserService');
const FavoriteService = require('../domain/service/FavoriteService');

const toggle = async (req) => {
    const user = req.user;
    const favoriteId = req.params.favoriteId;

    try {
        const userFavorites = user.get('favorites') || [];
        const hasFavorite = userFavorites.find(f => f.id === favoriteId);

        if (hasFavorite) {
            _.remove(userFavorites, f => f.id === favoriteId);
        } else {
            const newFavorite = new Parse.User();
            newFavorite.id = favoriteId;

            userFavorites.push(newFavorite);
        }

        user.set('favorites', userFavorites);
        user.save(null, { useMasterKey: true });
    } catch (e) {
        throw e;
    }

    // const favorite = await UserService.get(favoriteId);
    // const existingFavorite = await FavoriteService.getByUserId(user);
    //
    // try {
    //     if (!existingFavorite) {
    //         await FavoriteService.addFavoriteToUser(user, favorite);
    //     } else {
    //         const existingFavorites = existingFavorite.get('favorites');
    //         existingFavorites.push(favorite);
    //
    //         await existingFavorite.add();
    //     }
    // } catch (e) {
    //     throw e;
    // }
};

const hasFavorite = async (req) => {
    const userId = req.user.id;
    const favoriteId = req.params.favoriteId;

    try {
        const existingFavorite = await FavoriteService.getByUserId(userId);

        if (!existingFavorite) {
            return false;
        } else {
            return _.find(existingFavorite.get('favorites'), f => f.id === favoriteId);
        }
    } catch (e) {
        throw e;
    }
};

const myFavorites = async (req) => {
    const user = req.user;

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

        const favoriteEntries = user.get('favorites');

        const userQueries = [];
        for (let i = 0; i < favoriteEntries.length; i++) {
            userQueries.push(UserService.getById(favoriteEntries[i].id));
        }

        return await Promise.all(userQueries);
    } catch (e) {
        throw e;
    }
};

module.exports = {
    toggle,
    hasFavorite,
    myFavorites
};