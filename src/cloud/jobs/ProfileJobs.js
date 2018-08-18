const QueryCreator = require('../domain/helpers/QueryCreator');
const LOG_PREFIX = `JOB: PROFILE_IMPORT:`;

module.exports.MapProfiles = async (req, status) => {
    req.master = true;
    const logger = req.log;

    const pageSize = 100;

    const userCount = await getUserCount();
    const pages = userCount / pageSize;

    for (let i = 0; i < pages; i++) {
        let userBatch = await getUserBatch(i * pageSize);

        await processUserBatch(userBatch, status, logger);
    }

    console.log(userCount);
};

async function getUserCount() {
    return await QueryCreator.createQuery('User')
        .count();
}

async function getUserBatch(skipValue) {
    const userQuery = QueryCreator.createQuery('User');
    userQuery.skip(skipValue);

    return await userQuery
        .find({useMasterKey: true});
}

async function processUserBatch(users, status, logger) {
    let promises = users.map(async u => processProfileForUser(u, status, logger));
    return await Promise.all(promises);
}

async function processProfileForUser(u, status, logger) {
    logger.info(`${LOG_PREFIX} processing user: ${u.get('firstName')} ${u.get('lastName')}`);

    const profileQuery = QueryCreator.createQuery('Profile');
    profileQuery.equalTo('user', u);

    const profile = await profileQuery.first();

    if (profile) {
        const p = createProfileFromUser(profile, u);
        return await p.save();
    } else {
        const Profile = Parse.Object.extend('Profile');
        const p = new Profile();

        createProfileFromUser(p, u);

        return await p.save();
    }
}

function createProfileFromUser(p, u) {
    p.set('facebookId', u.get('facebookId'));
    p.set('email', u.getEmail());
    p.set('firstName', u.get('firstName'));
    p.set('lastName', u.get('lastName'));
    p.set('about', u.get('about'));
    p.set('profilePicture', u.get('profilePicture'));
    p.set('talents', u.get('skills'));
    p.set('location', u.get('location'));
    p.set('country', u.get('country'));
    p.set('city', u.get('city'));
    p.set('user', u);

    return p;
}
