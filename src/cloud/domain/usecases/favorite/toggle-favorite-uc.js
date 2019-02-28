const _ = require('lodash');

module.exports.execute = async (user, favoriteId) => {
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
};
