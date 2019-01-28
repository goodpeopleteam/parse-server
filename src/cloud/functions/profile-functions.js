const Profile = require('../domain/model/Profile');
const User = require('../domain/model/User');
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
    const user = req.user;
    const about = req.params.about;

    try {
        user.set('about', about);

        const savedUser = await user.save(null, { useMasterKey: true });

        res.success(User.mapFromParse(savedUser));
    } catch (e) {
        res.error(e.message);
    }
};

const upsertTalents = async (req, res) => {
    const user = req.user;
    const talents = req.params.talents;

    try {
        user.set('skills', talents);

        const savedUser = await user.save(null, { useMasterKey: true });

        res.success(User.mapFromParse(savedUser));
    } catch (e) {
        res.error(e.message);
    }
};

const get = async (req, res) => {
    const userId = req.user.id;
    const page = req.params.page;

    try {
        res.success(await UserService.get(userId, page));
    } catch (e) {
        res.error(e.message);
    }
};

const getById = async (req, res) => {
    const id = req.params.id;

    try {
        res.success(await UserService.getById(id))
    } catch (e) {
        res.error(e.message);
    }
};

const search = async (req, res) => {
    const term = req.params.term;

    try {
        res.success(await UserService.search(term))
    } catch (e) {
        res.error(e.message);
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
