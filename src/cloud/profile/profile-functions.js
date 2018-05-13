const Profile = require('../domain/model/Profile');

function createQuery(className) {
    const ClassName = Parse.Object.extend(className);
    return new Parse.Query(ClassName);
}

module.exports.profileCreate = (req, res) => {
    const p = req.params.profile;

    createQuery('User')
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

module.exports.get = (req, res) => {
    const query = createQuery('User');

    query.limit(5);

    query.find()
        .then(profiles => profiles.map(p => Profile.mapFromParse(p)))
        .then(profiles => res.success(profiles));
};

module.exports.getById = (req, res) => {
    const id = req.params.id;

    const query = createQuery('User');

    query.descending('created_at');

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
        const query = createQuery('User');

        query.get(id)
            .then(p => Profile.getCustomPicture(p))
            .then(content => res.success(content));
    }
};
