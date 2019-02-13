const User = require('./User');

function getProfilePictureUrl(profile, profilePicture) {
    if (profile) {
        return User.getProfilePictureUrl(profile);
    }

    if (!profilePicture)
        return "";
    const url = profilePicture.url();
    return url;
}

const mapFromParseV1 = (project) => {
    const id = project.id;
    const title = project.get('title');
    const description = project.get('description');
    const skillsNeeded = project.get('skillsNeeded') || [];

    const profile = project.get('user');
    let profilePicture = project.get('userImageProfile');

    const profilePictureUrl = getProfilePictureUrl(profile, profilePicture);

    if (!profile) {
        return {
            id,
            title,
            description,
            requiredTalents: skillsNeeded,
            profile: {
                id: project.get('userID'),
                fullName: project.get('userName'),
                location: {},
                profilePictureUrl: profilePictureUrl
            }
        };
    }

    return {
        id,
        title,
        description,
        requiredTalents: skillsNeeded,
        profile: User.mapFromParse(profile)
    };
};

const mapFromParse = (project, profile) => {
    const id = project.id;
    const title = project.get('title');
    const description = project.get('description');
    const skillsNeeded = project.get('skillsNeeded') || [];

    if (!profile) {
        return {
            id,
            title,
            description,
            requiredTalents: skillsNeeded
        };
    }

    return {
        id,
        title,
        description,
        requiredTalents: skillsNeeded,
        profile: {
            id: profile.id,
            firstName: profile.get('firstName'),
            lastName: profile.get('lastName'),
            location: profile.get('location')
        }
    };
};

module.exports = {
    mapFromParseV1,
    mapFromParse
};