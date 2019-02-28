const SearchTalentUc = require("../../domain/usecases/talent/search_talent_uc");

Parse.Cloud.define('Talent_search', async (req) => {
    try {
        return await SearchTalentUc.execute(req.params.term);
    } catch (e) {
        console.log(e);
    }
});