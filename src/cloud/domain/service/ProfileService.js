const QueryCreator = require('../helpers/QueryCreator');
const Profile = require('../model/Profile');

const CLASS_NAME = 'Profile';

const createProfileQuery = () => {
    return QueryCreator.createQuery(CLASS_NAME);
};

const add = async (params) => {
    try {
        const ParseProfile = Parse.Object.extend(CLASS_NAME);

        const profileQuery = QueryCreator.createQuery(CLASS_NAME);
        profileQuery.equalTo('email', params.email);

        const profile = await profileQuery.first() || new ParseProfile();

        profile.set('user', params.user);
        profile.set('email', params.email);
        profile.set('firstName', params.firstName);
        profile.set('lastName', params.lastName);

        const savedProfile = await profile.add();

        return Profile.mapFromParse(savedProfile);
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const get = async (id) => {
    try {
        const p = await createProfileQuery()
            .get(id);

        return Profile.mapFromParse(p);
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const getByUserId = async (id) => {
    try {
        const query = createProfileQuery();

        const user = new Parse.User();
        user.id = id;

        query.equalTo('user', user);

        let parseProfile = await query.first();

        return Profile.mapFromParse(parseProfile);
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const fetch = async (page) => {
    const pageSize = 20;

    try {
        const query = createProfileQuery();

        query.limit(pageSize);
        query.skip(page * pageSize);
        query.descending('createdAt');

        const profiles = await query.find();

        return profiles.map(p => Profile.mapFromParse(p));
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

const search = async (term) => {
    try {
        const query = createProfileQuery();

        query.fullText('firstName', term);
        query.fullText('lastName', term);

        return await query.find();
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

module.exports = {
    add,
    fetch,
    get,
    getByUserId,
    search
};