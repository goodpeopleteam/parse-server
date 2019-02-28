const ToggleFavoriteUc = require("../../domain/usecases/favorite/toggle-favorite-uc");
const HasFavoriteUc = require("../../domain/usecases/favorite/has-favorite-uc");
const GetMyFavoritesUc = require("../../domain/usecases/favorite/get-my-favorites-uc");

Parse.Cloud.define('Favorite_toggle', async (req) => {
    try {
        ToggleFavoriteUc.execute(req.user, req.params.favoriteId);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Favorite_hasFavorite', async (req) => {
    try {
        await HasFavoriteUc.execute(req.user, req.params.favoriteId);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Favorite_myFavorites', async (req) => {
    try {
        return await GetMyFavoritesUc.execute(req.user);
    } catch (e) {
        console.log(e);
    }
});