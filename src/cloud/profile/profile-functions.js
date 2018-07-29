const QueryCreator = require('../domain/helpers/QueryCreator');
const Profile = require('../domain/model/Profile');

function createUserQuery() {
    const User = Parse.Object.extend('User');
    return new Parse.Query(User);
}

module.exports.create = (req, res) => {
    const p = req.params.profile;

    QueryCreator.createQuery('User')
        .get(p.userId)
        .then(user => {
            const ParseProfile = Parse.Object.extend('Profile');
            const profile = new ParseProfile();

            profile.set('user', user);
            profile.set('firstName', p.firstName);
            profile.set('lastName', p.lastName);

            profile.save()
                .then(profile => res.success(Profile.mapFromParse(profile)))
                .catch(e => res.error(e))
        }).catch(e => res.error(e));
};

module.exports.upsertAbout = (req, res) => {
    const profileId = req.params.profileId;
    const about = req.params.about;

    QueryCreator.createQuery('Profile')
        .get(profileId)
        .then(p => {
            p.set('about', about);

            p.save()
                .then(p => res.success(Profile.mapFromParse(p)))
                .catch(e => res.error(e))
        }).catch(e => res.error(e))
};

module.exports.upsertTalents = (req, res) => {
    const profileId = req.params.profileId;
    const talents = req.params.talents;

    QueryCreator.createQuery('Profile')
        .get(profileId)
        .then(p => {
            p.set('talents', talents);

            p.save()
                .then(p => res.success(Profile.mapFromParse(p)))
                .catch(e => res.error(e))
        }).catch(e => res.error(e))
};

module.exports.get = (req, res) => {
    const page = req.params.page;

    const pageSize = 5;

    const query = createUserQuery();

    query.limit(pageSize);
    query.skip(page * pageSize);
    query.descending('createdAt');

    query.find()
        .then(profiles => profiles.map(p => Profile.mapFromParse(p)))
        .then(profiles => res.success(profiles));
};

module.exports.getById = (req, res) => {
    const id = req.params.id;

    const query = QueryCreator.createQuery('User');

    query.get(id)
        .then(p => Profile.mapFromParse(p))
        .then(profile => res.success(profile));
};

module.exports.getProfilePicture = (req, res) => {
    const id = req.params.id;
    const facebookId = req.params.facebookId;

    if (facebookId)
        Profile.getFacebookPicture(facebookId)
            .then(content => res.success(content));
    else {
        const query = QueryCreator.createQuery('User');

        query.get(id)
            .then(p => Profile.getCustomPicture(p))
            .then(content => res.success(content));
    }
};
