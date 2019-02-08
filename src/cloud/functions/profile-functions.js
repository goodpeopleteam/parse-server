const _ = require('lodash');
const User = require('../domain/model/User');
const UserService = require('../domain/service/UserService');
const ProfileService = require('../domain/service/ProfileService');

const create = async (req) => {
    req.master = true;

    const userId = req.user.id;
    const p = req.params.profile;

    try {
        const user = await UserService.get(userId);

        return await ProfileService.save({
            user,
            email: user.getEmail(),
            firstName: p.firstName,
            lastName: p.lastName
        });
    } catch (e) {
        throw e;
    }
};

const upsertAbout = async (req) => {
    const user = req.user;
    const about = req.params.about;

    try {
        user.set('about', about);

        const savedUser = await user.save(null, { useMasterKey: true });

        return User.mapFromParse(savedUser);
    } catch (e) {
        throw e;
    }
};

const upsertTalents = async (req) => {
    const user = req.user;
    const talents = req.params.talents;

    try {
        user.set('skills', talents);

        const savedUser = await user.save(null, { useMasterKey: true });

        return User.mapFromParse(savedUser);
    } catch (e) {
        throw e;
    }
};

const get = async (req) => {
    const userId = req.user.id;
    const page = req.params.page;

    try {
        return await UserService.get(userId, page);
    } catch (e) {
        throw e;
    }
};

const getById = async (req) => {
    const user = req.user;
    const profileId = req.params.id;

    try {
        const profile = await UserService.getById(profileId);
        if (user.id !== profile.id) {
            profile.isFavorite = _.find(user.get('favorites'), f => f.id === profileId) !== undefined;
        } else {
            profile.isFavorite = false;
        }

        return profile;
    } catch (e) {
        throw e;
    }
};

const search = async (req) => {
    const term = req.params.term;

    try {
        return await UserService.search(term);
    } catch (e) {
        throw e;
    }
};

module.exports = {
    create,
    upsertAbout,
    upsertTalents,
    get,
    getById,
    search
};
