const Profile = require('../domain/model/Profile');
const UserService = require('../domain/service/UserService');
const ProfileService = require('../domain/service/ProfileService');

const create = async (req, res) => {
    req.master = true;

    const userId = req.user.id;
    const p = req.params.profile;

    try {
        const user = await UserService.get(userId);

        const saveProfile = await ProfileService.save({
            user,
            email: user.getEmail(),
            firstName: p.firstName,
            lastName: p.lastName
        });

        res.success(saveProfile);
    } catch (e) {
        res.error(e.message);
    }
};

const upsertAbout = async (req, res) => {
    const profileId = req.params.profileId;
    const about = req.params.about;

    try {
        const profile = ProfileService.get(profileId);
        profile.set('about', about);

        res.success(Profile.mapFromParse(await profile.add()));
    } catch (e) {
        res.error(e.message);
    }
};

const upsertTalents = async (req, res) => {
    const profileId = req.params.profileId;
    const talents = req.params.talents;

    try {
        const p = await ProfileService.get(profileId);

        p.set('talents', talents);

        res.success(Profile.mapFromParse(await p.add()));
    } catch (e) {
        res.error(e.message);
    }
};

const get = async (req, res) => {
    const page = req.params.page;

    try {
        res.success(await ProfileService.fetch(page));
    } catch (e) {
        res.error(e.message);
    }
};

const getById = async (req, res) => {
    const id = req.params.id;

    try {
        res.success(await ProfileService.get(id))
    } catch (e) {
        res.error(e.message);
    }
};

module.exports = {
    create,
    upsertAbout,
    upsertTalents,
    get,
    getById
};
