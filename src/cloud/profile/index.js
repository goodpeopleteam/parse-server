import Profile from '../domain/model/Profile';

export const get = (req, res) => {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);

    query.limit(10);

    query.find()
        .then(profiles => profiles.map(p => Profile.mapFromParse(p)))
        .then(profiles => res.success(profiles));
};
