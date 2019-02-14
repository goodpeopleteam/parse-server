const FavoriteService = require("../../service/FavoriteService");
const _ = require("lodash");

module.exports.execute = async (user, favoriteId) => {
    const existingFavorite = await FavoriteService.getByUserId(user.id);

    if (!existingFavorite) {
        return false;
    } else {
        return _.find(existingFavorite.get('favorites'), f => f.id === favoriteId);
    }
};
