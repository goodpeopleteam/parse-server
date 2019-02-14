const UpdateProfileUc = require("../../domain/usecases/profile/update-profile-uc");
const CreateProfileUc = require("../../domain/usecases/profile/create-profile-uc");
const GetProfilesUc = require("../../domain/usecases/profile/get-profiles-uc");
const GetProfileUc = require("../../domain/usecases/profile/get-profile-uc");
const SearchProfilesUc = require("../../domain/usecases/profile/search-profiles-uc");

Parse.Cloud.define('Profile_create', async (req) => {
    try {
        return await CreateProfileUc.execute(req.user, req.params.profile);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Profile_update', async (req) => {
    try {
        return await UpdateProfileUc.execute(req.user, req.params.field, req.params.value);
    } catch (e) {
        console.log(e);
        throw e;
    }
});

Parse.Cloud.define('Profile_get', async (req) => {
    try {
        return await GetProfilesUc.execute(req.user, req.params.page);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Profile_getById', async (req) => {
    try {
        return await GetProfileUc.execute(req.user, req.params.id);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Profile_search', async (req) => {
    try {
        return await SearchProfilesUc.execute(req.params.term);
    } catch (e) {
        console.log(e);
    }
});