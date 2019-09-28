const UpdateProfileUc = require("../../domain/usecases/profile/update-profile-uc");
const CreateProfileUc = require("../../domain/usecases/profile/create-profile-uc");
const GetProfilesUc = require("../../domain/usecases/profile/get-profiles-uc");
const GetProfileUc = require("../../domain/usecases/profile/get-profile-uc");
const SearchProfilesUc = require("../../domain/usecases/profile/search-profiles-uc");
const UpdateProfileBasicInfoUc = require("../../domain/usecases/profile/update-profile-basic-info-uc");
const IncrementViewsCountUc = require("../../domain/usecases/profile/increment-views-count-uc");

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

Parse.Cloud.define('Profile_upsertBasicInfo', async (req) => {
    try {
        const params = req.params;

        return await UpdateProfileBasicInfoUc.execute(req.user, {
            email: params.email,
            firstName: params.firstName,
            lastName: params.lastName
        });
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

Parse.Cloud.define('Profile_getById', (req) => {
    try {
        return GetProfileUc.getById(req.user, req.params.id);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Profile_getByEmail', (req) => {
    try {
        return GetProfileUc.getByEmail(req.user, req.params.email);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Profile_search', async (req) => {
    try {
        return await SearchProfilesUc.execute(req.user, req.params.term);
    } catch (e) {
        console.log(e);
    }
});

Parse.Cloud.define('Profile_increaseViewsCount', async (req) => {
    try {
        return await IncrementViewsCountUc.execute(req.user, req.params.profileId);
    } catch (e) {
        console.log(e);
    }
});