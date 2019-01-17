const UrlHelper = require('../helpers/UrlHelper');

function getProfilePictureUrl(profilePicture) {
    if (!profilePicture)
        return "";
    const url = profilePicture.url();
    return UrlHelper.stripResourceFromUri(url);
}

const mapFromParseV1 = (project) => {
    const id = project.id;
    const title = project.get('title');
    const description = project.get('description');
    const skillsNeeded = project.get('skillsNeeded') || [];

    const profile = project.get('user');
    let profilePicture = project.get('userImageProfile');

    const profilePictureUrl = getProfilePictureUrl(profilePicture);

    if (!profile) {
        return {
            id,
            title,
            description,
            requiredTalents: skillsNeeded,
            profile: {
                id: project.get('userID'),
                fullName: project.get('userName'),
                location: project.get('userLocation'),
                profilePictureUrl: profilePictureUrl
            }
        };
    }

    return {
        id,
        title,
        description,
        requiredTalents: skillsNeeded,
        profile: {
            id: profile.id,
            fullName: `${profile.get('firstName')} ${profile.get('lastName')}`,
            profilePictureUrl: profilePictureUrl,
            location: {
                country: profile.get('country'),
                city: profile.get('city'),
                location: profile.get('location')
            }
        }
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