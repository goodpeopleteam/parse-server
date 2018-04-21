const Profile = require('../domain/model/Profile');

function createUserQuery() {
    const User = Parse.Object.extend('User');
    return new Parse.Query(User);
}

module.exports.get = (req, res) => {
    const query = createUserQuery();

    query.limit(5);

    query.find()
        .then(profiles => profiles.map(p => Profile.mapFromParse(p)))
        .then(profiles => res.success(profiles));
};

module.exports.getById = (req, res) => {
    const id = req.params.id;

    const query = createUserQuery();

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
        const query = createUserQuery();

        query.get(id)
            .then(p => Profile.getCustomPicture(p))
            .then(content => res.success(content));
    }
};
